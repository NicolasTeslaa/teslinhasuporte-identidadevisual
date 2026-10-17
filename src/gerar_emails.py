import argparse
import json
import re
import unicodedata
from pathlib import Path

from .contatos import ler_contatos
from .nichos import carregar_perfis, selecionar_perfil
from .renderizador import renderizar_email


RAIZ_PROJETO = Path(__file__).resolve().parents[1]


def _slug(valor):
    texto = unicodedata.normalize("NFKD", str(valor or ""))
    texto = "".join(char for char in texto if not unicodedata.combining(char))
    texto = re.sub(r"[^a-zA-Z0-9]+", "-", texto.lower()).strip("-")
    return texto or "contato"


def gerar_emails(entrada, saida, caminho_nichos=None):
    entrada = Path(entrada)
    saida = Path(saida)
    caminho_nichos = Path(caminho_nichos or RAIZ_PROJETO / "config" / "nichos.json")
    saida.mkdir(parents=True, exist_ok=True)
    contatos, relatorio = ler_contatos(entrada)
    perfis = carregar_perfis(caminho_nichos)
    arquivos = []
    usados = set()

    for contato in contatos:
        base = _slug("%s-%s" % (contato.get("empresa"), contato.get("nome_contato")))
        nome_arquivo = base + ".html"
        indice = 2
        while nome_arquivo in usados:
            nome_arquivo = "%s-%d.html" % (base, indice)
            indice += 1
        usados.add(nome_arquivo)
        caminho = saida / nome_arquivo
        perfil = selecionar_perfil(contato.get("nicho", ""), perfis)
        caminho.write_text(renderizar_email(contato, perfil), encoding="utf-8")
        arquivos.append(str(caminho))

    relatorio["arquivos"] = arquivos
    (saida / "relatorio.json").write_text(json.dumps(relatorio, ensure_ascii=False, indent=2), encoding="utf-8")
    return relatorio


def main():
    parser = argparse.ArgumentParser(description="Gera e-mails HTML personalizados por nicho.")
    parser.add_argument("entrada", help="Arquivo .xlsx ou .csv com os contatos")
    parser.add_argument("--saida", default="saida", help="Pasta dos HTMLs gerados")
    parser.add_argument("--nichos", default=None, help="Arquivo JSON de perfis de nicho")
    argumentos = parser.parse_args()
    relatorio = gerar_emails(argumentos.entrada, argumentos.saida, argumentos.nichos)
    print("E-mails gerados: %d | ignorados: %d" % (relatorio["processados"], len(relatorio["ignorados"])))


if __name__ == "__main__":
    main()
