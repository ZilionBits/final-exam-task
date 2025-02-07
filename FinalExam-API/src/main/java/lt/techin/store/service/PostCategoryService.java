package lt.techin.store.service;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lt.techin.store.model.PostCategory;
import lt.techin.store.repository.GenreRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Transactional
public class GenreService {

    private final GenreRepository genreRepository;

    public List<PostCategory> getAllGenres() {
        return genreRepository.findAll();
    }

    public PostCategory getGenreById(Long id) {
        return genreRepository.findById(id).get();
    }

    public PostCategory addGenre(String genre) {
        PostCategory newPostCategory = new PostCategory();
        newPostCategory.setName(genre);
        return genreRepository.save(newPostCategory);
    }

    public void deleteGenre(Long id) {
        genreRepository.deleteById(id);
    }

}
