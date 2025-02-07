package lt.techin.store.rest.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lt.techin.store.model.Post;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
public class GameDto {

    private Long id;
    private String name;
    private String imageUrl;
    private int metaScore;
    private BigDecimal price;
    @NotEmpty(message = "At least one platform must be provided.")
    private Set<String> cities = new HashSet<>();
    private Set<GenreDto> genres = new HashSet<>();

    public GameDto(Post post) {
        this.id = post.getId();
        this.name = post.getName();
        this.imageUrl = post.getImageUrl();
        this.metaScore = post.getMetaScore();
        this.price = post.getPrice();
        this.cities.addAll(post.getCities());
        this.genres = post.getPostCategories().stream().map(GenreDto::new).collect(Collectors.toSet());
    }
}
