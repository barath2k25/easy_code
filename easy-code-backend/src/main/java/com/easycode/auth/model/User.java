package com.easycode.auth.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users", uniqueConstraints = {
    @UniqueConstraint(columnNames = "username"),
    @UniqueConstraint(columnNames = "email")
})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false)
    private String passwordHash;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

    // Constructors
    public User() {}

    public User(Long id, String username, String email, String passwordHash, LocalDateTime createdAt) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.passwordHash = passwordHash;
        this.createdAt = createdAt;
    }

    // Builder pattern
    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private String username;
        private String email;
        private String passwordHash;

        public Builder id(Long id)                    { this.id = id; return this; }
        public Builder username(String username)       { this.username = username; return this; }
        public Builder email(String email)             { this.email = email; return this; }
        public Builder passwordHash(String passwordHash) { this.passwordHash = passwordHash; return this; }

        public User build() {
            User u = new User();
            u.id = this.id;
            u.username = this.username;
            u.email = this.email;
            u.passwordHash = this.passwordHash;
            return u;
        }
    }

    // Getters & Setters
    public Long getId()                      { return id; }
    public void setId(Long id)               { this.id = id; }

    public String getUsername()              { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail()                 { return email; }
    public void setEmail(String email)       { this.email = email; }

    public String getPasswordHash()               { return passwordHash; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }

    public LocalDateTime getCreatedAt()                    { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt)      { this.createdAt = createdAt; }
}
