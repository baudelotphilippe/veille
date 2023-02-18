<?php

namespace App\Entity;


use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\LienRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/** 
   * @ApiResource( 
   *      normalizationContext={"groups"={"lien:read"}},
   *      denormalizationContext={"groups"={"lien:write"}},
   *      order={"createdAt"="DESC"}
   * )
   */
  #[ORM\Entity(repositoryClass: LienRepository::class)]
  class Lien
{
    /**
     *
     * @Groups("lien:read")
     */
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    /**
     *  @Groups({"lien:read","lien:write"})
     */
    #[ORM\Column(type: 'string', length: 500)]
    private $url;

    /**
     *  @Groups("lien:read")
     */
    #[ORM\Column(type: 'datetime', nullable: true)]
    private $createdAt;

    /**
     * @Groups({"lien:read","lien:write"})
     */
    #[ORM\ManyToMany(targetEntity: Tags::class, inversedBy: 'liens', cascade: ['persist'])]
    private $tags;

    /**
     * @Groups({"lien:read"})
     */
    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'liens')]
    #[ORM\JoinColumn(nullable: false)]
    private $createur;

    public function __construct()
    {
        $this->createdAt = new DateTime();
        $this->tags = new ArrayCollection();
    }
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

    /**
     * @return Collection|Tags[]
     */
    public function getTags(): Collection
    {
        return $this->tags;
    }

    public function addTag(Tags $tag): self
    {
        if (!$this->tags->contains($tag)) {
            $this->tags[] = $tag;
        }

        return $this;
    }

    public function removeTag(Tags $tag): self
    {
        $this->tags->removeElement($tag);

        return $this;
    }

    public function getCreateur(): ?User
    {
        return $this->createur;
    }

    public function setCreateur(?User $createur): self
    {
        $this->createur = $createur;

        return $this;
    }
}
