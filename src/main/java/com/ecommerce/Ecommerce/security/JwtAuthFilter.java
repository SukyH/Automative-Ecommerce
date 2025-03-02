package com.ecommerce.Ecommerce.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtils jwtUtils;
    private final  CustomUserDetailsService customUserDetailsService;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String token = getTokenFromRequest(request);

            if (token != null) {
                String username = jwtUtils.getUsernameFromToken(token);
                
                if (StringUtils.hasText(username)) { // Ensure username is not empty
                    UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);

                    if (jwtUtils.isTokenValid(token, userDetails)) {
                        log.info("VALID JWT: {}", username);

                        UsernamePasswordAuthenticationToken authenticationToken =
                                new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                        if (SecurityContextHolder.getContext().getAuthentication() == null) {
                            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                        }
                    }
                }
            }
        } catch (Exception e) {
            log.error("Failed to authenticate JWT: {}", e.getMessage());
        }
        
        filterChain.doFilter(request, response);
    }

    private String getTokenFromRequest(HttpServletRequest request){
        String token = request.getHeader("Authorization");
        if (StringUtils.hasText(token) && StringUtils.startsWithIgnoreCase(token, "Bearer ")){
            return token.substring(7);
        }
        return null;
    }
}
