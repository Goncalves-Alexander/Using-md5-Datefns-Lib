// dataHoraAtual RETORNA A DATA E A HORA ATUAL DO SISTEMA
const dataHoraAtual = () => {
    let now = new Date();
    let localDate = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    return localDate;
}

// numberDay RETORNA O DIA DA SEMANA. EX. Domingo = 0, Segunda = 1
const numeroDia = () => {
    let now = new Date();
    return now.getDay();
}

// AS FUNÇÕES ABAIXO NÃO ESTÃO SENDO USADAS
// horaAtual RETORNA A HORA ATUAL DO SISTEMA
const horaAtual = () => {
    let now = new Date();
    let localDate = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    return localDate;
}

// toTimeStamp CONVERTE A DATA/HORA ATUAL DO SISTEMA PARA TIMESTAMP
    // TIMESTAMP = A QUANTIDADE DE MILISSEGUNDOS DESDE DO DIA 01/01/1970 
const timeStamp = strRealDate => {
    var date = Date.parse(strRealDate);
    return date;
}

// toRealTime CONVERTE O TIMESTAMP EM DATA/HORA
const tempoReal = strTimeDate => {
    var date = new Date(strTimeDate);
    return date;
}

module.exports = {
    dataHoraAtual,
    horaAtual,
    timeStamp,
    tempoReal,
    numeroDia
}