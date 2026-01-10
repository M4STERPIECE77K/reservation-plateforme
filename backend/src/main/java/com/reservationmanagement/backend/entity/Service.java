package com.reservationmanagement.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "service")
public class Service {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String category;

    @Column(length = 2000)
    private String description;

    @Column(columnDefinition = "TEXT")
    private String fullDescription;

    private String duration;
    private String price;
    private boolean popular;
    @Column(length = 1000)
    private String image;

    @ElementCollection
    @Column(length = 1000)
    private List<String> gallery;

    private Double rating;
    private Integer reviews;
    private String location;
    private String providerName;
    private boolean isVerified;
}
