package lt.techin.store.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lt.techin.store.rest.dto.PostDto;
import lt.techin.store.service.PostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/v1")
public class GameController {

    private final PostService postService;

    @GetMapping
    public ResponseEntity<List<PostDto>> getAllGames() {
        return ResponseEntity.status(HttpStatus.OK).body(postService.getAllGames());
    }

    @PostMapping
    public ResponseEntity<PostDto> createGame(@RequestBody @Valid PostDto postDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(postService.addGame(postDto));
    }

}
