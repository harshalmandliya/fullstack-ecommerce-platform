package com.ecommerce.project.security.jwt;

import com.ecommerce.project.security.services.UserDetailsImp;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.util.WebUtils;

import javax.crypto.SecretKey;
import java.security.Key;
import java.security.PublicKey;
import java.util.Date;

@Component
public class JwtUtils {
    private static final Logger logger= LoggerFactory.getLogger(JwtUtils.class);
    @Value("${spring.app.jwtExpirationMs}")
    private Integer jwtExpirationMs;
    @Value("${spring.app.jwtSecret}")
    private String jwtSecret;
    @Value("${spring.ecom.app.jwtCookie}")
    private String jwtCookie;

    public String getJwtFromCookies(HttpServletRequest request) {
   Cookie cookie= WebUtils.getCookie(request,jwtCookie);
   if(cookie!=null){
       return cookie.getValue();
   }
   else{
       return null;
   }
    }

    public ResponseCookie generateJwtCookie(UserDetailsImp userPrincipal){
      String jwt=generateTokenFromUsername(userPrincipal.getUsername());
      ResponseCookie cookie=ResponseCookie.from(jwtCookie,jwt)
              .path("/api")
              .maxAge(24*60*60)
              .httpOnly(false)
              .build();
    return cookie;
    }

    public ResponseCookie getCleanJwtCookie(){
        ResponseCookie cookie=ResponseCookie.from(jwtCookie,null)
                .path("/api")
                .build();
        return cookie;
    }

    public String generateTokenFromUsername(String username){
        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date(new Date().getTime()+jwtExpirationMs))
                .signWith(key())
                .compact();
    }
    public String generateUsernameFromToken(String token){
        return Jwts.parser().verifyWith((SecretKey) key())
                .build().parseSignedClaims(token)
                .getPayload().getSubject();
    }

    private Key key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

    public boolean validateJwtToken(String authToken){
        try{
            System.out.println("Validate");
            Jwts.parser().verifyWith((SecretKey) key())
                    .build().parseSignedClaims(authToken);
            return true;
        }
        catch(Exception e){
logger.error(e.getMessage());
        }
        return false;
    }

}
