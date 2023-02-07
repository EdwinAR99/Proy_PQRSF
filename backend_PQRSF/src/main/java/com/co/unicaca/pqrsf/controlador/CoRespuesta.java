package com.co.unicaca.pqrsf.controlador;

import java.io.File;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
//Imports usados para el anexoresource y hhttpheaders
import org.springframework.core.io.Resource; 
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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

import com.co.unicaca.pqrsf.entidad.Respuesta;
import com.co.unicaca.pqrsf.servicio.ResServicio;
//Paquetes para manejar los anexos
import com.co.unicaca.pqrsf.utilidades.Response;
import java.util.Map;
import com.co.unicaca.pqrsf.servicio.ResServicioAnexo;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/respuesta")
public class CoRespuesta {

    @Autowired
    private ResServicio resServicio;
    //Variable del servico para manejar el anexo
    @Autowired
    private ResServicioAnexo fileServiceAnexo;

    @GetMapping(value = "/listRespuesta")
    public ResponseEntity list() {
        return new ResponseEntity(resServicio.listRes(), HttpStatus.OK);
    }

    @GetMapping(value = "/{pqrId}/listRespuesta")
    public ResponseEntity getResByPqr(@PathVariable(value = "pqrId") Integer pqrId) {
        return new ResponseEntity(resServicio.getResByPqr(pqrId), HttpStatus.OK);
    }

    @GetMapping(value = "/listRespuesta/{resId}")
    public ResponseEntity getRes(@PathVariable(value = "resId") Integer resId) {
        return new ResponseEntity(resServicio.getResById(resId), HttpStatus.OK);
    }

    @PostMapping(value = "/addRespuesta")
    public ResponseEntity add(@RequestBody Respuesta res) {
        System.out.printf("Respuesta " + res.getResId());
        return new ResponseEntity(resServicio.addRes(res), HttpStatus.OK);
    }

    @PutMapping(value = "/updateRespuesta/{resId}")
    public ResponseEntity update(@PathVariable(value = "resId") Integer resId, @RequestBody Respuesta res) {
        return new ResponseEntity(resServicio.editRes(resId, res), HttpStatus.OK);
    }

    @DeleteMapping(value = "/deleteRespuesta/{resId}")
    public ResponseEntity delete(@PathVariable(value = "resId") Integer resId) {
        return new ResponseEntity(resServicio.deleteRes(resId), HttpStatus.OK);
    }
    //Servicios de anexo

    //Servicio para almacenar el archivo adjunto
    @PostMapping(value = "/anexo")
    public Map<String, String> uploadFiles(@RequestParam("files") List<MultipartFile> files) throws Exception {
        fileServiceAnexo.save(files);
        return Map.of("url", files.toString());
    }

    @GetMapping(value = "/{filename}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) throws Exception {
        Resource resource = fileServiceAnexo.load(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename())
                .contentType(MediaType.APPLICATION_PDF)
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
