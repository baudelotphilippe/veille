<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\TagsRepository;
// use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     normalizationContext={"groups"={"tag:read"}},
 *     denormalizationContext={"groups"={"tag:write"}},
 *     order={"label"="ASC"}
 * )
 */
#[ORM\Entity(repositoryClass: TagsRepository::class)]
class Tags
{
    /**
     * @Groups("tag:read")
     */
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    /**
     * @Groups({"tag:read", "tag:write", "lien:read", "lien:write"})
     */
    #[ORM\Column(type: 'string', length: 255, unique: true)]
    private $label;

    /**
     * @ApiSubresource
     */
    #[ORM\ManyToMany(targetEntity: Lien::class, mappedBy: 'tags')]
    private $liens;

    public function __construct()
    {
        $this->liens = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLabel(): ?string
    {
        return $this->label;
    }

    public function setLabel(string $label): self
    {
        $this->label = $label;

        return $this;
    }

    /**
     * @return Collection|Lien[]
     */
    public function getLiens(): Collection
    {
        return $this->liens;
    }

    public function addLien(Lien $lien): self
    {
        if (!$this->liens->contains($lien)) {
            $this->liens[] = $lien;
            $lien->addTag($this);
        }

        return $this;
    }

    public function removeLien(Lien $lien): self
    {
        if ($this->liens->removeElement($lien)) {
            $lien->removeTag($this);
        }

        return $this;
    }
}
