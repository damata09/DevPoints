package com.plataforma.repository;

import com.plataforma.model.user;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface userepository extends JpaRepository<userepository, Long> {
    Optional<user> findByUsername(String username);
}