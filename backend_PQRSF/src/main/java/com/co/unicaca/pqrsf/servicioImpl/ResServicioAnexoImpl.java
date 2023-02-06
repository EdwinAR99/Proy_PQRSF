/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
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

import com.co.unicaca.pqrsf.servicio.ResServicioAnexo;

@Service
public class ResServicioAnexoImpl implements ResServicioAnexo {

    private final Path rootFolder = Paths.get("AnexosRespuestas");

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
