import unittest

from src.nichos import carregar_perfis, selecionar_perfil
from src.renderizador import renderizar_email


class RenderizadorTest(unittest.TestCase):
    def test_renderiza_personalizacao_e_identificacao_da_teslinha(self):
        perfis = carregar_perfis("config/nichos.json")
        contato = {
            "nome_contato": "João & Filhos",
            "empresa": "Imóveis Sol",
            "nicho": "imobiliária",
            "email": "joao@example.com",
            "cidade": "Jundiaí",
        }

        html = renderizar_email(contato, selecionar_perfil(contato["nicho"], perfis))

        self.assertIn("João &amp; Filhos", html)
        self.assertIn("Imóveis Sol", html)
        self.assertIn("site", html.lower())
        self.assertIn("CNPJ 62.372.202/0001-11", html)
        self.assertIn("5511910246542", html)
        self.assertIn("https://raw.githubusercontent.com/", html)
        self.assertIn("<!--[if mso]>", html)
        self.assertNotIn("<script", html.lower())
        self.assertNotIn("data:", html.lower())

    def test_permite_substituir_problema_solucao_e_cta_por_contato(self):
        perfis = carregar_perfis("config/nichos.json")
        contato = {
            "nome_contato": "Maria",
            "empresa": "Barbearia Central",
            "nicho": "barbearia",
            "email": "maria@example.com",
            "problema": "os horários ficam espalhados nas mensagens",
            "solucao": "um sistema simples de agendamento",
            "cta": "Quero ver uma ideia para a barbearia",
        }

        html = renderizar_email(contato, selecionar_perfil(contato["nicho"], perfis))

        self.assertIn("os horários ficam espalhados nas mensagens", html)
        self.assertIn("um sistema simples de agendamento", html)
        self.assertIn("Quero ver uma ideia para a barbearia", html)


if __name__ == "__main__":
    unittest.main()
