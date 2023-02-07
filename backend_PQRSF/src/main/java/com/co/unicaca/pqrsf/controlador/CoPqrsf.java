package com.co.unicaca.pqrsf.controlador;



import java.io.File;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import com.co.unicaca.pqrsf.entidad.PQRSF;
import com.co.unicaca.pqrsf.entidad.Traslado;
import com.co.unicaca.pqrsf.servicio.PetServicio;
import com.co.unicaca.pqrsf.servicio.PqrServicio;

//Paquetes para manejar los anexos
import com.co.unicaca.pqrsf.utilidades.Response;
import java.util.Map;
import com.co.unicaca.pqrsf.servicio.PqrServicioAnexo;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/pqrsf")
public class CoPqrsf {

    @Autowired
    private PqrServicio pqrServicio;

    @Autowired
    private PetServicio petServicio;
    //Variable del servico para manejar el anexo
    @Autowired
    private PqrServicioAnexo fileServiceAnexo;

    @GetMapping(value = "/listPqrsf")
    public ResponseEntity list() {
        return new ResponseEntity(pqrServicio.listPqr(), HttpStatus.OK);
    }

    @GetMapping(value = "/listPqrsf/{pqrId}")
    public ResponseEntity getPqr(@PathVariable(value = "pqrId") Integer pqrId) {
        return new ResponseEntity(pqrServicio.getPqrById(pqrId), HttpStatus.OK);
    }

    @PostMapping(value = "/addPqrsf")
    public ResponseEntity add(@RequestBody PQRSF pqr) {
        pqr.getTraId().get(0).setPqrId(pqr);
        if (pqr.getPetId().getPetId() != 1) {
            petServicio.addPet(pqr.getPetId());
        }
        return new ResponseEntity(pqrServicio.addPqr(pqr), HttpStatus.OK);
    }

    @PutMapping(value = "/updatePqrsf/{pqrId}")
    public ResponseEntity update(@PathVariable(value = "pqrId") Integer pqrId, @RequestBody PQRSF pqr) {
        for (Traslado tra : pqr.getTraId()) {
            tra.setPqrId(pqr);
        }
        return new ResponseEntity(pqrServicio.editPqr(pqrId, pqr), HttpStatus.OK);
    }

    @DeleteMapping(value = "/deletePqrsf/{pqrId}")
    public ResponseEntity delete(@PathVariable(value = "pqrId") Integer pqrId) {
        return new ResponseEntity(pqrServicio.deletePqr(pqrId), HttpStatus.OK);
    }
    
    
    //Servicio para almacenar el archivo adjunto
    @PostMapping(value = "/anexo")
    public Map<String, String> uploadFiles(@RequestParam("files") List<MultipartFile> files) throws Exception {
        fileServiceAnexo.save(files);
        return Map.of("url", files.toString());
    }
   /* 
    @PostMapping(value = "/anexo")
    public ResponseEntity<Response> uploadFiles(@RequestParam("files") List<MultipartFile> files) throws Exception {
        fileServiceAnexo.save(files);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response("Los archivos fueron cargados correctamente al servidor"));
    }
*/
    
    @GetMapping(value="/{filename}")
	public ResponseEntity<Resource> getFile(@PathVariable String filename) throws Exception {
		Resource resource = fileServiceAnexo.load(filename);
		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename())
				.contentType(MediaType.APPLICATION_PDF)
				.body(resource);
	}
	
	@GetMapping(value="/all")
	public ResponseEntity<List<File>> getAllFiles() throws Exception {
		List<File> files = fileServiceAnexo.loadAll().map(path -> {
			String filename = path.getFileName().toString();
			String url = MvcUriComponentsBuilder.fromMethodName(CoPqrsf.class, "getFile", path.getFileName().toString()).build().toString();
			
			return new File(filename, url);
		}).collect(Collectors.toList());
		
		return ResponseEntity.status(HttpStatus.OK).body(files);
	}
}
