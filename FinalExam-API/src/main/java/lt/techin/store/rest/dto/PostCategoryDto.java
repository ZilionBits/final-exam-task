package lt.techin.store.rest.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lt.techin.store.model.PostCategory;

@Data
@NoArgsConstructor
public class GenreDto {

    private Long id;
    private String name;

    public GenreDto(PostCategory postCategory) {
        this.id = postCategory.getId();
        this.name = postCategory.getName();
    }
}
