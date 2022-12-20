<?php

namespace App\Factory;

use App\Entity\Lien;
use App\Repository\LienRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<Lien>
 *
 * @method        Lien|Proxy create(array|callable $attributes = [])
 * @method static Lien|Proxy createOne(array $attributes = [])
 * @method static Lien|Proxy find(object|array|mixed $criteria)
 * @method static Lien|Proxy findOrCreate(array $attributes)
 * @method static Lien|Proxy first(string $sortedField = 'id')
 * @method static Lien|Proxy last(string $sortedField = 'id')
 * @method static Lien|Proxy random(array $attributes = [])
 * @method static Lien|Proxy randomOrCreate(array $attributes = [])
 * @method static LienRepository|RepositoryProxy repository()
 * @method static Lien[]|Proxy[] all()
 * @method static Lien[]|Proxy[] createMany(int $number, array|callable $attributes = [])
 * @method static Lien[]|Proxy[] createSequence(array|callable $sequence)
 * @method static Lien[]|Proxy[] findBy(array $attributes)
 * @method static Lien[]|Proxy[] randomRange(int $min, int $max, array $attributes = [])
 * @method static Lien[]|Proxy[] randomSet(int $number, array $attributes = [])
 */
final class LienFactory extends ModelFactory
{
    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#factories-as-services
     *
     * @todo inject services if required
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories
     *
     * @todo add your default values here
     */
    protected function getDefaults(): array
    {
        return [
            'url' => self::faker()->text(500),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this
            // ->afterInstantiate(function(Lien $lien): void {})
        ;
    }

    protected static function getClass(): string
    {
        return Lien::class;
    }
}
