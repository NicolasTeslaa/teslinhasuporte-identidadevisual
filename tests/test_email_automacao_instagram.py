from html.parser import HTMLParser
from pathlib import Path
import re
import unittest


EMAIL_PATH = Path(__file__).resolve().parents[1] / "email-automacao-instagram.html"


class EmailParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.tags = []
        self.links = []
        self.text = []

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        self.tags.append(tag)
        if tag == "a":
            self.links.append(attributes.get("href", ""))

    def handle_data(self, data):
        self.text.append(data)


class EmailAutomacaoInstagramTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.source = EMAIL_PATH.read_text(encoding="utf-8")
        cls.parser = EmailParser()
        cls.parser.feed(cls.source)
        cls.visible_text = re.sub(r"\s+", " ", " ".join(cls.parser.text)).strip()

    def test_comunica_oferta_aprovada_em_poucos_segundos(self):
        expected_phrases = (
            "Seu Instagram ativo. Seu dia mais leve.",
            "40 imagens por mês",
            "R$ 100",
            "2 conteúdos por dia",
            "segunda a sexta",
            "1 Feed + 1 Story",
            "2 Feeds",
            "2 Stories",
        )
        for phrase in expected_phrases:
            with self.subTest(phrase=phrase):
                self.assertIn(phrase, self.visible_text)

    def test_cta_abre_whatsapp_sem_javascript(self):
        self.assertTrue(
            any(link.startswith("https://wa.me/5511910246542") for link in self.parser.links)
        )
        self.assertIn("Quero ativar pelo WhatsApp", self.visible_text)
        self.assertNotIn("script", self.parser.tags)

    def test_email_nao_depende_de_imagens_e_cabe_no_limite_do_gmail(self):
        self.assertNotIn("img", self.parser.tags)
        self.assertLess(EMAIL_PATH.stat().st_size, 102_400)

    def test_inclui_botao_compativel_com_outlook(self):
        self.assertIn("<!--[if mso]>", self.source)
        self.assertIn("<v:roundrect", self.source)


if __name__ == "__main__":
    unittest.main()
