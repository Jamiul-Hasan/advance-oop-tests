package com.example.demo.service;

import com.example.demo.model.Item;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class ItemService {
    private final Map<Long, Item> store = new ConcurrentHashMap<>();
    private final AtomicLong idCounter = new AtomicLong(0);

    public Collection<Item> findAll() {
        return store.values();
    }

    public Item findById(Long id) {
        return store.get(id);
    }

    public Item create(Item item) {
        long id = idCounter.incrementAndGet();
        item.setId(id);
        store.put(id, item);
        return item;
    }

    public Item update(Long id, Item item) {
        item.setId(id);
        store.put(id, item);
        return item;
    }

    public Item patch(Long id, Map<String, Object> updates) {
        Item existing = store.get(id);
        if (existing == null) return null;
        if (updates.containsKey("title")) existing.setTitle((String) updates.get("title"));
        if (updates.containsKey("description")) existing.setDescription((String) updates.get("description"));
        store.put(id, existing);
        return existing;
    }

    public boolean delete(Long id) {
        return store.remove(id) != null;
    }
}
