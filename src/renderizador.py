import html
from pathlib import Path
from string import Template
from urllib.parse import quote


TEMPLATE_PATH = Path(__file__).resolve().parents[1] / "templates" / "email-prospeccao.html"


def _texto(valor):
    return html.escape(str(valor or "").strip(), quote=True)


def _beneficios(contato, perfil):
    valor = contato.get("beneficios")
    if isinstance(valor, str) and valor.strip():
        itens = [item.strip() for item in valor.split("|") if item.strip()]
    elif isinstance(valor, (list, tuple)):
        itens = [str(item).strip() for item in valor if str(item).strip()]
    else:
        itens = list(perfil.get("beneficios", []))
    return (itens + ["Organizar melhor a rotina"] * 3)[:3]


def _contexto(contato, perfil):
    nome = contato.get("nome_contato", "")
    empresa = contato.get("empresa", "")
    nicho = contato.get("nicho", "")
    cidade = contato.get("cidade") or "sua região"
    problema = contato.get("problema") or perfil["problema"]
    consequencia = contato.get("consequencia") or perfil["consequencia"]
    solucao = contato.get("solucao") or perfil["solucao"]
    cta = contato.get("cta") or perfil["cta"]
    beneficios = _beneficios(contato, perfil)
    texto_cta = "Olá! Vi uma oportunidade de melhorar a rotina da %s e gostaria de conversar." % empresa
    return {
        "subject": _texto("%s: uma ideia para melhorar a rotina" % empresa),
        "preheader": _texto("%s, uma ideia de tecnologia para a %s." % (nome, empresa)),
        "nome_contato": _texto(nome),
        "empresa": _texto(empresa),
        "nicho": _texto(nicho),
        "cidade": _texto(cidade),
        "titulo": _texto(perfil.get("titulo", "Tecnologia para deixar sua rotina mais leve")),
        "problema": _texto(problema),
        "consequencia": _texto(consequencia),
        "solucao": _texto(solucao),
        "beneficio_1": _texto(beneficios[0]),
        "beneficio_2": _texto(beneficios[1]),
        "beneficio_3": _texto(beneficios[2]),
        "cta": _texto(cta),
        "whatsapp_link": "https://wa.me/5511910246542?text=" + quote(texto_cta),
    }


def renderizar_email(contato, perfil, caminho_template=TEMPLATE_PATH):
    template = Template(Path(caminho_template).read_text(encoding="utf-8"))
    return template.substitute(_contexto(contato, perfil))
