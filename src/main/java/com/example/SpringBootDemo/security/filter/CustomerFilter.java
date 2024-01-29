package com.example.SpringBootDemo.security.filter;

import com.example.SpringBootDemo.customer.Customer;
import com.example.SpringBootDemo.customer.CustomerRepository;
import com.example.SpringBootDemo.exception.NotFoundException;
import com.example.SpringBootDemo.user.UserRole;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;
import java.util.regex.Pattern;

@Component
@AllArgsConstructor
public class CustomerFilter extends OncePerRequestFilter {

    private final CustomerRepository customerRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // check authentication and the user is customer role or not
        if (authentication == null || !authentication.getAuthorities().contains(new SimpleGrantedAuthority(UserRole.CUSTOMER.toString()))) {
            filterChain.doFilter(request, response);
            return;
        }
        // remove the Context Path from request URL
        final String requestURI = request.getRequestURI().replace(request.getContextPath(), "");

        // if path id exist then proceed
        getPathId(requestURI).ifPresent((pathId) -> {
            // get this customer of authentication user detail
            final UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            Customer customer = customerRepository.findByUsername(userDetails.getUsername())
                    .orElseThrow(() -> new NotFoundException("Customer Not Found"));

            // if path id does not match with customer id
            if (!customer.getId().equals(pathId)) {
                // disapprove authentication of this customer
                SecurityContextHolder.getContext().setAuthentication(null);
            }
        });

        filterChain.doFilter(request, response);
    }

    // check path then get path id
    private Optional<Long> getPathId(String requestURI) {
        // path must contain customer cart url
        Pattern customerCartURL = Pattern.compile("/customer/[0-9]+/(cart|order).*", Pattern.CASE_INSENSITIVE);

        if (customerCartURL.matcher(requestURI).matches()) {
            // get path id
            String pathId = requestURI.substring(10, requestURI.indexOf("/", 10));
            return Optional.of(Long.parseLong(pathId));
        }
        return Optional.empty();
    }
}
