export class Validation {

    value!: boolean
    message!: string

    isRequired  (val: string, type: string) {
        if (val !== '') {
            this.value = true

            if (val.split('').length > 3) {
                this.value = true
            } else {
                this.value = false
                this.message = 'Поле не может быть меньше 3-х символов'
            }
    
            if (type === "name") {
                if(val.split(' ').length > 2) {
                    this.value = false
                    this.message = 'В поле не может быть больше 2-х слов'
                } else if (val.split(' ').length < 2){
                    this.value = false
                    this.message = 'В поле не может быть меньше 2-х слов'
                } else {
                    this.value = true
                    if(val.split(' ')[0].split('').length < 3 || val.split(' ')[1].split('').length < 3) {
                        this.value = false
                        this.message = '"Имя" и/или "Фамилия" не может быть меньше 3-х символов'
                    }
                    if((val.split(' ')[0].split('').length > 30 || val.split(' ')[1].split('').length > 30)) {
                        this.value = false
                        this.message = '"Имя" и/или "Фамилия" не может быть больше 30-ти символов'
                    }
                }
            }
    
            if(type === 'email') {
                if(val.split('@').length === 1) {
                    this.value = false
                    this.message = 'Адрес электронной почты должен содержать символ "@". В адресе "'+ val +'" отсуствует символ "@"'
                } else {
                    this.value = true
                }
            }
    
            if (type === 'message') {
                if (val.split('').length > 10) {
                    this.value = true
                } else {
                    this.value = false
                    this.message = 'Поле не может быть меньше 10 символов'
    
                }
            }

        } else {
            this.value = false
            this.message = 'Поле не может быть пустым'
        }
    }
}

