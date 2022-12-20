<?php

namespace App\DataFixtures;

use App\Entity\Lien;
use App\Entity\Tags;

use App\Factory\LienFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class LienFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $product=LienFactory::createOne();


        $article=new Tags();
        $title = "Tag Fixture";
        $article->setLabel($title);

        $product->addTag($article);
        $manager->persist($article);
        $manager->flush();
    }
}
