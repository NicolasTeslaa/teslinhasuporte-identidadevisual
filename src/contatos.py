import csv
import re
from pathlib import Path


COLUNAS_OBRIGATORIAS = {"nome_contato", "empresa", "nicho", "email", "autorizou_marketing"}
VALORES_AUTORIZADOS = {"sim", "s", "true", "1", "yes", "x", "autorizado"}


def _valor(valor):
    return str(valor or "").strip()


def _autorizado(valor):
    return _valor(valor).lower() in VALORES_AUTORIZADOS


def _email_valido(email):
    return bool(re.fullmatch(r"[^\s@]+@[^\s@]+\.[^\s@]+", email))


def _validar_colunas(cabecalho):
    ausentes = sorted(COLUNAS_OBRIGATORIAS - set(cabecalho))
    if ausentes:
        raise ValueError("Colunas obrigatórias ausentes: " + ", ".join(ausentes))


def _ler_csv(caminho):
    with caminho.open("r", newline="", encoding="utf-8-sig") as arquivo:
        leitor = csv.DictReader(arquivo)
        _validar_colunas(leitor.fieldnames or [])
        return list(leitor)


def _ler_xlsx(caminho):
    try:
        from openpyxl import load_workbook
    except ImportError as erro:
        raise RuntimeError("Para ler XLSX, instale as dependências com: pip install -r requirements.txt") from erro

    planilha = load_workbook(caminho, read_only=True, data_only=True)
    folha = planilha.active
    linhas = list(folha.values)
    if not linhas:
        raise ValueError("A planilha está vazia")
    cabecalho = [_valor(valor) for valor in linhas[0]]
    _validar_colunas(cabecalho)
    return [dict(zip(cabecalho, linha)) for linha in linhas[1:] if any(valor is not None for valor in linha)]


def ler_contatos(caminho):
    caminho = Path(caminho)
    if not caminho.exists():
        raise FileNotFoundError("Arquivo de contatos não encontrado: " + str(caminho))
    if caminho.suffix.lower() == ".csv":
        linhas = _ler_csv(caminho)
    elif caminho.suffix.lower() in {".xlsx", ".xlsm"}:
        linhas = _ler_xlsx(caminho)
    else:
        raise ValueError("Formato não suportado. Use .csv ou .xlsx")

    autorizados = []
    ignorados = []
    for numero, linha in enumerate(linhas, start=2):
        contato = {chave: _valor(valor) for chave, valor in linha.items()}
        if not _autorizado(contato.get("autorizou_marketing")):
            ignorados.append({"linha": numero, "motivo": "sem_autorizacao", "nome": contato.get("nome_contato", "")})
            continue
        if not _email_valido(contato.get("email", "")):
            raise ValueError("E-mail inválido na linha %d: %s" % (numero, contato.get("email", "")))
        autorizados.append(contato)

    return autorizados, {"processados": len(autorizados), "ignorados": ignorados, "erros": []}
