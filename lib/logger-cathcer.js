// JavaScript source code
/**
 * Created by we on 2018. 8. 30.
 */
'use strict';

module.exports = () => {
    return (req, rep, next) => {
        loggerFactory.info('Occupy Access Log');

        // �̵��� router �ݹ鿡�� next �Ǵ� response�� ���� ������ �����ϸ� Ŭ���̾�Ʈ�� ��� ����ϰ� �ǹǷ� �� ���� �� ��.
        next();
    }
};