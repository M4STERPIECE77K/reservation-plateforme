package com.reservationmanagement.backend.service;

import com.reservationmanagement.backend.entity.User;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

class JwtServiceTest {

    private JwtService jwtService;

    @BeforeEach
    void setUp() {
        jwtService = new JwtService();
        ReflectionTestUtils.setField(jwtService, "secretKey",
                "404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970");
        ReflectionTestUtils.setField(jwtService, "jwtExpiration", 86400000L);
    }

    @Test
    void generateToken_ShouldIncludeUserClaims() {
        // Arrange
        User user = User.builder()
                .firstName("John")
                .lastName("Doe")
                .email("john.doe@example.com")
                .phoneNumber("1234567890")
                .profileImageUrl("http://example.com/image.png")
                .password("password")
                .build();

        String token = jwtService.generateToken(user);
        Assertions.assertNotNull(token);

        String firstName = jwtService.extractClaim(token, claims -> claims.get("firstName", String.class));
        String lastName = jwtService.extractClaim(token, claims -> claims.get("lastName", String.class));
        String email = jwtService.extractUsername(token);

        Assertions.assertEquals("John", firstName);
        Assertions.assertEquals("Doe", lastName);
        Assertions.assertEquals("john.doe@example.com", email);
    }
}
