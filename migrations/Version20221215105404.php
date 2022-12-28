<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221215105404 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        // $this->addSql('DROP SEQUENCE article_id_seq CASCADE');
        // $this->addSql('DROP SEQUENCE messenger_messages_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE tags_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE lien_tags (lien_id INT NOT NULL, tags_id INT NOT NULL, PRIMARY KEY(lien_id, tags_id))');
        $this->addSql('CREATE INDEX IDX_8C31C3C6EDAAC352 ON lien_tags (lien_id)');
        $this->addSql('CREATE INDEX IDX_8C31C3C68D7B4FB4 ON lien_tags (tags_id)');
        $this->addSql('CREATE TABLE tags (id INT NOT NULL, label VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE lien_tags ADD CONSTRAINT FK_8C31C3C6EDAAC352 FOREIGN KEY (lien_id) REFERENCES lien (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE lien_tags ADD CONSTRAINT FK_8C31C3C68D7B4FB4 FOREIGN KEY (tags_id) REFERENCES tags (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('DROP TABLE messenger_messages');
        $this->addSql('DROP TABLE article');
        $this->addSql('ALTER TABLE lien ALTER created_at TYPE TIMESTAMP(0) WITHOUT TIME ZONE');
        $this->addSql('ALTER TABLE lien ALTER created_at DROP NOT NULL');
        $this->addSql('COMMENT ON COLUMN lien.created_at IS NULL');
        $this->addSql('ALTER TABLE "user" ALTER roles SET NOT NULL');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649E7927C74 ON "user" (email)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE tags_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE article_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE messenger_messages_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE messenger_messages (id BIGSERIAL NOT NULL, body TEXT NOT NULL, headers TEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, available_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, delivered_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX idx_75ea56e016ba31db ON messenger_messages (delivered_at)');
        $this->addSql('CREATE INDEX idx_75ea56e0e3bd61ce ON messenger_messages (available_at)');
        $this->addSql('CREATE INDEX idx_75ea56e0fb7336f0 ON messenger_messages (queue_name)');
        $this->addSql('CREATE TABLE article (id INT NOT NULL, date_publication DATE NOT NULL, titre VARCHAR(50) NOT NULL, contenu TEXT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE lien_tags DROP CONSTRAINT FK_8C31C3C6EDAAC352');
        $this->addSql('ALTER TABLE lien_tags DROP CONSTRAINT FK_8C31C3C68D7B4FB4');
        $this->addSql('DROP TABLE lien_tags');
        $this->addSql('DROP TABLE tags');
        $this->addSql('ALTER TABLE lien ALTER created_at TYPE TIMESTAMP(0) WITHOUT TIME ZONE');
        $this->addSql('ALTER TABLE lien ALTER created_at SET NOT NULL');
        $this->addSql('COMMENT ON COLUMN lien.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('DROP INDEX UNIQ_8D93D649E7927C74');
        $this->addSql('ALTER TABLE "user" ALTER roles DROP NOT NULL');
    }
}
