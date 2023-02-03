<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230129071455 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP SEQUENCE lestags_id_seq CASCADE');
        $this->addSql('DROP TABLE lestags');
        // ajouter 17 pour permettre la migration sur un user existant ...
        $this->addSql('ALTER TABLE lien ADD createur_id INT NOT NULL default 17');
        $this->addSql('ALTER TABLE lien ADD CONSTRAINT FK_A532B4B573A201E5 FOREIGN KEY (createur_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_A532B4B573A201E5 ON lien (createur_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('CREATE SEQUENCE lestags_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE lestags (id INT NOT NULL, label VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE lien DROP CONSTRAINT FK_A532B4B573A201E5');
        $this->addSql('DROP INDEX IDX_A532B4B573A201E5');
        $this->addSql('ALTER TABLE lien DROP createur_id');
    }
}
