# Entrada de contatos

Coloque aqui a planilha recebida para geração dos e-mails. O gerador aceita `.xlsx` e `.csv`.

## Colunas obrigatórias

`nome_contato`, `empresa`, `nicho`, `email`, `autorizou_marketing`

Use `sim` em `autorizou_marketing` apenas quando houver autorização registrada. Linhas sem autorização positiva são ignoradas e ficam registradas em `saida/relatorio.json`.

## Colunas opcionais

`cidade`, `problema`, `consequencia`, `solucao`, `beneficios`, `cta` e `site_atual`.

Em `beneficios`, separe até três itens com `|`. Se `problema`, `consequencia`, `solucao`, `beneficios` ou `cta` estiverem vazios, o perfil de `config/nichos.json` será usado.

Exemplo:

```text
nome_contato,empresa,nicho,email,autorizou_marketing,cidade
Ana,Imóveis Sol,imobiliária,ana@example.com,sim,Jundiaí
Bruno,Corte Bom,barbearia,bruno@example.com,não,Várzea Paulista
```
