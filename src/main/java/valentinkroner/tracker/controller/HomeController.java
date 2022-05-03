package valentinkroner.tracker.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

    @RequestMapping(path = {"/", "/issue/**"})
    public String index() {
        return "index";
    }

}
