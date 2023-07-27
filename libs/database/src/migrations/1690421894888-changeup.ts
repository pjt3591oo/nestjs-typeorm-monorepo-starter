import { MigrationInterface, QueryRunner } from "typeorm";

export class Changeup1690421894888 implements MigrationInterface {
    name = 'Changeup1690421894888'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`transfer_history\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`amount\` int NOT NULL COMMENT '이체금액', \`status\` tinyint NOT NULL COMMENT '이체결과', \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`age\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`notification_history\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL COMMENT '알림 제목', \`description\` varchar(255) NOT NULL COMMENT '알림 부가내용', \`status\` tinyint NOT NULL COMMENT '성공, 실패에 따른 알림 여부', \`isView\` tinyint NOT NULL COMMENT '알림 확인 여부', \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`transfer_history\` ADD CONSTRAINT \`FK_ef17efcf01817de10f32e549adf\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notification_history\` ADD CONSTRAINT \`FK_0f4aa9bb533acbeda49fb4f7cd0\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notification_history\` DROP FOREIGN KEY \`FK_0f4aa9bb533acbeda49fb4f7cd0\``);
        await queryRunner.query(`ALTER TABLE \`transfer_history\` DROP FOREIGN KEY \`FK_ef17efcf01817de10f32e549adf\``);
        await queryRunner.query(`DROP TABLE \`notification_history\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`transfer_history\``);
    }

}
