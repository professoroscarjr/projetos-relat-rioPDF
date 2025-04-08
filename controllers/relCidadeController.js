const Dados = require('../models/relCidadeModel');
const PdfPrinter = require('pdfmake');



// Função para gerar o PDF
async function gerarPDF(users) {

    const fonts = {
        Roboto: {
            normal: 'node_modules/pdfmake/fonts/Roboto-Regular.ttf',
            bold: 'node_modules/pdfmake/fonts/Roboto-Bold.ttf',
            italics: 'node_modules/pdfmake/fonts/Roboto-Italic.ttf',
            bolditalics: 'node_modules/pdfmake/fonts/Roboto-BoldItalic.ttf',
        },
    };

    const printer = new PdfPrinter(fonts);

    const docDefinition = {
        content: [
            { text: 'Relatório de Clientes', style: 'header' },
            {
                table: {
                    headerRows: 1,
                    widths: ['auto', '*', '*'],
                    body: [
                        ['ID', 'Nome', 'Email'],
                        ...users.map(user => [
                            user.id,
                            user.name,
                            user.email]),
                    ],
                },
            },
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [0, 0, 0, 10],
            },
        },
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    const chunks = [];

    return new Promise((resolve, reject) => {
        pdfDoc.on('data', chunk => chunks.push(chunk));
        pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));
        pdfDoc.on('error', reject);
        pdfDoc.end();
    });
};
// GERAR RELATÓRIO EM PDF
exports.generatePDF = async (req, res) => {
    try {
        const { cidade} = req.query;
        if (!cidade) {
            return res.status(400).send('Informe o nome da cidade.');
        }

      
        const data = await Dados.getCidadetoPDF(cidade);
        // Gera o PDF com os dados filtrados
            
        const pdfBuffer = await gerarPDF(data);

        // Envia o PDF como resposta
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=relatorio.pdf');
        res.send(pdfBuffer);
    } catch (error) {
        console.error('Erro ao gerar PDF:', error.message);
        res.status(500).send('Erro ao gerar relatório PDF.');
    }
};