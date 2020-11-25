// JavaScript source code
const appRoot = require('app-root-path');    // app root ��θ� �������� lib
const winston = require('winston');            // winston lib
const process = require('process');

const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;    // log ��� ���� ����
});

const options = {
    // log����
    file: {
        level: 'info',
        filename: `${appRoot}/logs/winston-test.log`, // �α������� ���� ���
        handleExceptions: true,
        json: false,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
        format: combine(
            label({ label: 'winston-test' }),
            timestamp(),
            myFormat    // log ��� ����
        )
    },
    // ���� �� console�� ���
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false, // �α����¸� json���ε� ���� �� �ִ�.
        colorize: true,
        format: combine(
            label({ label: 'nba_express' }),
            timestamp(),
            myFormat
        )
    }
}

let logger = new winston.createLogger({
    transports: [
        new winston.transports.File(options.file) // �߿�! ������ ������ option���� �α� ���� ���� ��� transport
    ],
    exitOnError: false,
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console(options.console)) // ���� �� console�ε� ���
}

module.exports = logger;