# Gerador de e-mails de prospecção por nicho — Especificação

## Objetivo

Gerar um HTML de e-mail personalizado para cada contato autorizado a receber marketing, usando dados de uma planilha Excel e um perfil de mensagem específico para o nicho da empresa.

## Regras

- Só contatos com `autorizou_marketing` positivo geram e-mail.
- O nome e a empresa aparecem no HTML final.
- A mensagem deve atacar o problema do nicho e apresentar uma solução relacionada a sites, sistemas, aplicativos, integrações ou automações.
- Não inventar preço, prazo, garantia, certificação, quantidade de clientes ou resultado garantido.
- O rodapé inclui Teslinha Suporte, CNPJ `62.372.202/0001-11`, WhatsApp `(11) 91024-6542` e Várzea Paulista — SP.
- O HTML não usa JavaScript, fontes externas ou imagens base64; usa tabelas e fallback Outlook.

## Entrada e saída

Aceita `.xlsx` e `.csv`, com as colunas obrigatórias `nome_contato`, `empresa`, `nicho`, `email` e `autorizou_marketing`. `cidade`, `problema`, `consequencia`, `solucao`, `beneficios` e `cta` são opcionais. Gera `saida/<empresa>-<nome>.html` e `saida/relatorio.json`.

Os perfis iniciais ficam em `config/nichos.json`: imobiliária, barbearia e padrão para nichos desconhecidos.

## Fora de escopo

O sistema não envia e-mails, não pesquisa empresas externamente e não valida consentimento além do campo fornecido.
