package com.co.unicaca.pqrsf.controlador;


import java.io.File;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
//Imports usados para el anexoresource y hhttpheaders
import org.springframework.core.io.Resource; 
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
//import para el anexo
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
//import para el anexo
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import com.co.unicaca.pqrsf.entidad.PQRSF;
import com.co.unicaca.pqrsf.entidad.Traslado;
import com.co.unicaca.pqrsf.servicio.TraServicio;

//Paquetes para manejar los anexos
import com.co.unicaca.pqrsf.utilidades.Response;
import java.util.Map;
import com.co.unicaca.pqrsf.servicio.TraServicioAnexo;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/traslado")
public class CoTraslado {

    @Autowired
    private TraServicio traServicio;
    //Variable del servico para manejar el anexo
    @Autowired
    private TraServicioAnexo fileServiceAnexo;

    @GetMapping(value = "/listTraslado")
    public ResponseEntity list() {
        return new ResponseEntity(traServicio.listTra(), HttpStatus.OK);
    }

    @GetMapping(value = "/{pqrId}/listTraslado")
    public ResponseEntity listByPqr(@PathVariable(value = "pqrId") Integer pqrId) {
        return new ResponseEntity(traServicio.listTraByPqr(pqrId), HttpStatus.OK);
    }

    @GetMapping(value = "/listTraslado/{traId}")
    public ResponseEntity getRes(@PathVariable(value = "traId") Integer traId) {
        return new ResponseEntity(traServicio.getTraById(traId), HttpStatus.OK);
    }

    @PostMapping(value = "/{pqrId}/addTraslado")
    public ResponseEntity addByPqr(@PathVariable(value = "pqrId") Integer pqrId, @RequestBody Traslado tra) {
        tra.setPqrId(new PQRSF());
        tra.getPqrId().setPqrId(pqrId);
        return new ResponseEntity(traServicio.addTra(tra), HttpStatus.OK);
    }

    @PostMapping(value = "/addTraslado")
    public ResponseEntity add(@RequestBody Traslado tra) {
        return new ResponseEntity(traServicio.addTra(tra), HttpStatus.OK);
    }

    @PutMapping(value = "/updateTraslado/{traId}")
    public ResponseEntity update(@PathVariable(value = "traId") Integer traId, @RequestBody Traslado tra) {
        return new ResponseEntity(traServicio.editTra(traId, tra), HttpStatus.OK);
    }

    @DeleteMapping(value = "/deleteTraslado/{traId}")
    public ResponseEntity delete(@PathVariable(value = "traId") Integer traId) {
        return new ResponseEntity(traServicio.deleteTra(traId), HttpStatus.OK);
    }

    //Servicio para almacenar el archivo adjunto
    @PostMapping(value = "/anexo")
    public Map<String, String> uploadFiles(@RequestParam("files") List<MultipartFile> files) throws Exception {
        fileServiceAnexo.save(files);
        return Map.of("url", files.toString());
    }

    @GetMapping(value = "/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) throws Exception {
        Resource resource = fileServiceAnexo.load(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @GetMapping(value = "/all")
    public ResponseEntity<List<File>> getAllFiles() throws Exception {
        List<File> files = fileServiceAnexo.loadAll().map(path -> {
            String filename = path.getFileName().toString();
            String url = MvcUriComponentsBuilder.fromMethodName(CoPqrsf.class, "getFile", path.getFileName().toString()).build().toString();

            return new File(filename, url);
        }).collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(files);
    }
     
}
