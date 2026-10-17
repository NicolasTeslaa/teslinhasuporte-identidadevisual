import json
import re
import unicodedata
from pathlib import Path
from typing import Union


def normalizar_nicho(valor: str) -> str:
    texto = unicodedata.normalize("NFKD", str(valor or ""))
    texto = "".join(caractere for caractere in texto if not unicodedata.combining(caractere))
    return re.sub(r"[^a-z0-9]+", " ", texto.lower()).strip().replace(" ", "-")


def carregar_perfis(caminho: Union[str, Path]) -> dict:
    dados = json.loads(Path(caminho).read_text(encoding="utf-8"))
    return {normalizar_nicho(chave): dict(perfil, chave=normalizar_nicho(chave)) for chave, perfil in dados.items()}


def selecionar_perfil(nicho: str, perfis: dict) -> dict:
    return perfis.get(normalizar_nicho(nicho), perfis["padrao"])
