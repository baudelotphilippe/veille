<?php

namespace App\Entity;


use Doctrine\ORM\Mapping as ORM;
use App\Repository\LienRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource( 
 *      normalizationContext={"groups"={"read"}},
 *      denormalizationContext={"groups"={"write"}}
 * )
 * @ORM\Entity(repositoryClass=LienRepository::class)
 */
class Lien
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * 
     * @Groups("read")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=500)
     * 
     *  @Groups({"read","write"})
     */
    private $url;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * 
     *  @Groups("read")
     */
    private $createdAt;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUrl(): ?string
    {
        return $this->url;
    }

    public function setUrl(string $url): self
    {
        $this->url = $url;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(?\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }
}
