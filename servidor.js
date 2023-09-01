const arquivos = require('fs')
const express = require('express')
const app = express()
app.use(express.urlencoded({ extended: true }))

function fatorial(n) {
    if (n == 0) {
        return 1;
    }
    var resp = n;
    while (n > 2) {
        resp *= --n;
        result = resp;
    }
    return result;
}

app.get("/operacoes", (req, res) => {
    //result = parseFloat(n1.value) + parseFloat(n2.value);
    const nome = req.query.nome
    console.log("Recebi uma requisição de conta de ", nome);
    const n1 = parseFloat(req.query.N1)
    const n2 = parseFloat(req.query.N2)
    const op = req.query.op
    let result
    if (op == '+')
        result = n1 + n2
    if (op == '-')
        result = n1 - n2
    if (op == 'x')
        result = n1 * n2
    if (op == '/')
        result = n1 / n2
    let nomeArq = "dados/" + nome + ".txt"
    //let resultadoArq = {N1: n1, N2: n2, op: op, resultado: result}
    //resultadoArq = JSON.stringify(resultadoArq)

    req.query.resultado = result
    let resultadoArq = JSON.stringify(req.query)

    arquivos.writeFileSync(nomeArq, resultadoArq)
    res.send({ conta: req.query });
});

const rotaFatorial = app.route("/fat");
rotaFatorial.post((req, res) => {
    const n1 = req.body.N1
    const result = fatorial(n1)
    res.send({ conta: result });
})

const rotaContasFeitas = app.route("/contas");
rotaContasFeitas.get((req, res) => {
    let contasGravadas = [];
    arquivos.readdirSync("./dados/").forEach(file => {
        if (file.includes(".txt")) {
            contasGravadas.push(file);
        }
    });
    //console.log(contasGravadas);
    res.send({ contas: contasGravadas });
})

const rotaUmaConta = app.route("/umaconta/:nome");
rotaUmaConta.get((req, res) => {
    const nomeArq = "dados/" + req.params.nome
    const conteudoArq = arquivos.readFileSync(nomeArq)
    const stringArq = conteudoArq.toString()
    const objArq = JSON.parse(stringArq)
    res.send({ conta: objArq });
})

const rotaDelete = app.route("/apagaconta/:nome");
rotaDelete.get((req, res) => {
    const arq = "dados/" + req.params.nome;
    arquivos.unlink(arq, () => {
        res.send({msg: "Arquivo apagado: " + req.params.nome});
    });
})

porta = 8080
console.log("Servidor funcionando na porta " + porta);
app.listen(porta);
