// const token = "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJWMzZqVmhOc2o3MjBmbk9VaGN4bENjNXlQcHdseU44aEtLdlJLTlFGWVBTMHhhYVVjUiIsImp0aSI6IjhmMGY1ODRlYTBlZjg0MGY2NDYyMzEyYWQzNWIwODIzMjlhMGMyNDVmY2NiYTY3MDI0MGY2Mzg4ODIxYzcwMzZkNjkxYWIwNDUzY2JhYWM1IiwiaWF0IjoxNjIxNDkxNDAyLCJuYmYiOjE2MjE0OTE0MDIsImV4cCI6MTYyMTQ5NTAwMiwic3ViIjoiIiwic2NvcGVzIjpbXX0.CZrzndiR3WzYyNKW_HUSuyREqshhict7LQmKaNwoPqIbuIh1x699UxVmOO0EvQIJWKqGDyoEGu3H7prWGhLDN5Jqei-bsln24E8SL3b3VD9Jfr--bRxCx96JlVek9TkP6KhThEVqVE6khbjMUtIsxC-6SA39Y5j78XffEWiH6fqh-xpWk_WfmOe2XyNkDnybupcEwlo_s2E_IZBx_LqS5sOF4ug8SDmc8oQgWGaj6fMp5VrQG7O9I6-xb3B-uRQV-4-Ktl-VenemD0Ey7ZmS2XxGLdOYPheMBnSMN7BZIWCakkHfpQp4V4kOItkAAIFEcn7FrrdeoPNar73WMaQeBA" 
sessionStorage.setItem('myToken',
    JSON.stringify(
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJWMzZqVmhOc2o3MjBmbk9VaGN4bENjNXlQcHdseU44aEtLdlJLTlFGWVBTMHhhYVVjUiIsImp0aSI6IjhmMGY1ODRlYTBlZjg0MGY2NDYyMzEyYWQzNWIwODIzMjlhMGMyNDVmY2NiYTY3MDI0MGY2Mzg4ODIxYzcwMzZkNjkxYWIwNDUzY2JhYWM1IiwiaWF0IjoxNjIxNDkxNDAyLCJuYmYiOjE2MjE0OTE0MDIsImV4cCI6MTYyMTQ5NTAwMiwic3ViIjoiIiwic2NvcGVzIjpbXX0.CZrzndiR3WzYyNKW_HUSuyREqshhict7LQmKaNwoPqIbuIh1x699UxVmOO0EvQIJWKqGDyoEGu3H7prWGhLDN5Jqei-bsln24E8SL3b3VD9Jfr--bRxCx96JlVek9TkP6KhThEVqVE6khbjMUtIsxC-6SA39Y5j78XffEWiH6fqh-xpWk_WfmOe2XyNkDnybupcEwlo_s2E_IZBx_LqS5sOF4ug8SDmc8oQgWGaj6fMp5VrQG7O9I6-xb3B-uRQV-4-Ktl-VenemD0Ey7ZmS2XxGLdOYPheMBnSMN7BZIWCakkHfpQp4V4kOItkAAIFEcn7FrrdeoPNar73WMaQeBA'
    ))

    let sendReq = (ev) => {
            let url = 'https://api.petfinder.com/v2/animals?type=dog&page=2';
            let token = JSON.parse(sessionStorage.getItem('myToken'));

            let head = new Headers();
            head.append('Authorization', `Bearer ${token}`);

            let req = new Request(url, {
                method: 'GET',
                mode: 'cors',
                headers: head


            });
            fetch(req)
                .then(resp => resp.JSON())
                .then(data => {
                    console.log(data[0]);
                })
                .catch(err => {
                    console.error(err.message);
                })
    }
