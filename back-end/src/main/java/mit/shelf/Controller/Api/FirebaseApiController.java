package mit.shelf.Controller.Api;

import mit.shelf.Form.MemberForm;
import mit.shelf.domain.Book;
import mit.shelf.repository.FirebaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FirebaseApiController {

    @Autowired
    FirebaseService firebaseService;

    @PostMapping("/insertMember")
    public String insertMember(MemberForm form) throws Exception {
        Book book = new Book();

        book.setName(form.getName());
        book.setBookNum(form.getBookNum());
        book.setBorrower(form.getBorrower());
        book.setUid(form.getUid());
        book.setRUid(form.getSmartUid());
        book.setDonor(form.getDonor());
        book.setBookFloor(form.getBookFloor());
        book.setBookCmp(form.getBookCmp());
        book.setCategory(form.getCategory());
        book.setImg(form.getImg());
        book.setWriter(form.getWriter());
        book.setCount(form.getCount());
        return firebaseService.insertBook(book);
    }



    @GetMapping("/getMemberDetail")
    public Book getMemberDetail(@RequestParam Long id) throws Exception {
        return firebaseService.getBookDetail(id);
    }



    @GetMapping("/updateMember")
    public String updateMember(@RequestParam Book book) throws Exception {
        return firebaseService.updateBook(book);
    }



    @GetMapping("/deleteMember")
    public String deleteMember(@RequestParam Long id) throws Exception {
        return firebaseService.deleteBook(id);
    }
}
