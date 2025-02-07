package lt.techin.store.service;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lt.techin.store.model.Post;
import lt.techin.store.model.PostCategory;
import lt.techin.store.repository.GameRepository;
import lt.techin.store.repository.GenreRepository;
import lt.techin.store.rest.dto.PostDto;
import lt.techin.store.rest.dto.GenreDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Transactional
public class GameService {

    private final GameRepository gameRepository;
    private final GenreRepository genreRepository;

    public List<PostDto> getAllGames() {
        return gameRepository.findAll().stream().map(PostDto::new).toList();
    }

    public Post getGameById(Long id) {
        return gameRepository.findById(id).get();
    }

    public PostDto addGame(PostDto postDto) {
        Post newPost = new Post();
        newPost.setName(postDto.getName());
        newPost.setImageUrl(postDto.getImageUrl());
        newPost.setDescription(postDto.getDescription());
        newPost.setPrice(postDto.getPrice());
        newPost.setCities(postDto.getCities());

        Set<Long> genresId = postDto.getGenres().stream().map(GenreDto::getId).collect(Collectors.toSet());

        Set<PostCategory> postCategories = genreRepository.findAll().stream()
                .filter(genre -> genresId.contains(genre.getId())).collect(Collectors.toSet());
        newPost.setPostCategories(postCategories);

        gameRepository.save(newPost);

        return new PostDto(newPost);
    }


}
