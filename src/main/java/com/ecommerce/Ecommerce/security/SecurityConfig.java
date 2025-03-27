package com.ecommerce.Ecommerce.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
            .csrf(AbstractHttpConfigurer::disable)
            //.cors(Customizer.withDefaults())
            .cors(AbstractHttpConfigurer::disable)

            .authorizeHttpRequests(request -> request
                // Admin routes
                .requestMatchers("/admin/**").hasRole("ADMIN")
                
                // Public routes
                .requestMatchers(
                    "/auth/**", "/category/**", "/product/**", "/order/**", 
                    "/api/users/**", "/catalog/**", "/items/**", "/orders/**", 
                    "/hot-deals/**", "/address/**", "/wishlist/**", "/api/sales/**", 
                    "/api/usage/**", "/api/visit/**", "/categories/**", "/usage/**","/user/my-info/**",
                    "/catalog/items/upload").permitAll()

                //  Allow access to /user/my-info only for authenticated users
                //.requestMatchers("/user/my-info").authenticated()

                // All other requests require authentication
                .anyRequest().authenticated()
            )
            .sessionManagement(manager -> manager.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return httpSecurity.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
