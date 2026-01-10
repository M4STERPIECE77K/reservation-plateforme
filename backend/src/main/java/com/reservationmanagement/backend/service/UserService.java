package com.reservationmanagement.backend.service;

import com.reservationmanagement.backend.entity.User;
import com.reservationmanagement.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository repository;
    @Value("${application.file.upload-dir:uploads}")
    private String uploadDir;

    public String uploadProfileImage(String email, MultipartFile file) throws IOException {
        User user = repository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        log.info("Current Working Directory: {}", System.getProperty("user.dir"));
        Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
        log.info("Try to upload file to: {}", uploadPath);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
            log.info("Created directory: {}", uploadPath);
        }
        String originalFilename = file.getOriginalFilename();
        String extension = ".jpg";
        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }
        String newFilename = UUID.randomUUID().toString() + extension;
        Path filePath = uploadPath.resolve(newFilename);

        log.info("Saving file to: {}", filePath);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        String fileUrl = "http://localhost:9090/api/v1/users/images/" + newFilename;
        user.setProfileImageUrl(fileUrl);
        repository.save(user);

        return fileUrl;
    }
}
