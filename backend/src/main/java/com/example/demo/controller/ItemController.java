package com.example.demo.controller;

import com.example.demo.model.Item;
import com.example.demo.service.ItemService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Map;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "*")
public class ItemController {
    private final ItemService service;

    public ItemController(ItemService service) {
        this.service = service;
    }

    @GetMapping
    public Collection<Item> all() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Item> getById(@PathVariable Long id) {
        Item item = service.findById(id);
        if (item == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(item);
    }

    @PostMapping
    public ResponseEntity<Item> create(@RequestBody Item item) {
        Item created = service.create(item);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Item> replace(@PathVariable Long id, @RequestBody Item item) {
        Item existing = service.findById(id);
        if (existing == null) return ResponseEntity.notFound().build();
        Item updated = service.update(id, item);
        return ResponseEntity.ok(updated);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Item> patch(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        Item patched = service.patch(id, updates);
        if (patched == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(patched);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        boolean removed = service.delete(id);
        if (!removed) return ResponseEntity.notFound().build();
        return ResponseEntity.noContent().build();
    }
}
