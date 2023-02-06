package com.co.unicaca.pqrsf.servicioImpl;

/**
 *
 * @author Rivera
 */

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Stream;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.co.unicaca.pqrsf.servicio.PqrServicioAnexo;

@Service
public class PqrAnexoImpl implements PqrServicioAnexo {
    
    private final Path rootFolder = Paths.get("AnexosLocales");

 
    @Override
    public void save(MultipartFile file) throws Exception {
        //Guardando el archivo localment
        Files.copy(file.getInputStream(), this.rootFolder.resolve(file.getOriginalFilename()));
        //Obteniendo nombre original
        String filename = file.getOriginalFilename(); //Obteniendo nombre original
        //obteniendo la ruta del anexo
        Path destinationFile = rootFolder.resolve(Paths.get(filename)).normalize().toAbsolutePath();

    }

    @Override
    public Resource load(String name) throws Exception {
        Path file = rootFolder.resolve(name);
        Resource resource = new UrlResource(file.toUri());
        return resource;
    }

    @Override
    public void save(List<MultipartFile> files) throws Exception {
        for (MultipartFile file : files) {
            this.save(file);
        }
    }

    @Override
    public Stream<Path> loadAll() throws Exception {
        return Files.walk(rootFolder, 1).filter(path -> !path.equals(rootFolder)).map(rootFolder::relativize);
    }

}
