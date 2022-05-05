export default class App
{
    constructor()
    {
        this.getElement = (selector) => document.querySelector(selector)

        this._phone = ""
        this._message = ""

        this._apiWhatsApp = "https://api.whatsapp.com/send?phone=55"
        this._webWhatsApp = "https://web.whatsapp.com/send?phone=55"
        this._link = ""
        this._totalDigitsRequired = 11

        this.submit = {
            enable: () => {
                window.form.submit.disabled = false
            },

            disable: () => {
                window.form.submit.disabled = true
            }
        }

        this.userMessage = {
            success: (props) => {

                let msgTag = this.getElement('.user-message')

                msgTag.innerText = props.text

                if (!msgTag.classList.contains('success'))
                {
                    msgTag.classList.add('success')
                }

                if (msgTag.classList.contains('error'))
                {
                    msgTag.classList.remove('error')
                }

                if (msgTag.classList.contains('d-none'))
                {
                    msgTag.classList.remove('d-none')
                }

            },
            error: (props) => {
                let msgTag = this.getElement('.user-message')

                msgTag.innerText = props.text

                if(!msgTag.classList.contains('error'))
                {
                    msgTag.classList.add('error')
                }

                if(msgTag.classList.contains('success'))
                {
                    msgTag.classList.remove('success')
                }

                if(msgTag.classList.contains('d-none'))
                {
                    msgTag.classList.remove('d-none')
                }
            }
        }

        this.start()
    }

    start()
    {
        window.form.phone.onkeyup = ({target}) => {
            
            if (target.value.length === this.getTotalDigitsRequired)
            {
                this.submit.enable()
                return
            }

            this.submit.disable()
        }

        window.form.new.onclick = () => this.restart()

        window.form.copy.onclick = () => {
            window.form.link.select()
            document.execCommand ('Copy')
        }

        window.form.open.onclick = () => window.open(this.getLink, 'blank')

        window.form.onsubmit = (event) => {
            event.preventDefault()

            this.setPhone = window.form.phone.value
            this.setMessage = window.form.message.value
            this.setPlataform = window.form.plataform.value

            this.validations()
        }
    }

    set setPhone(args)
    {
        this._phone = args
    }

    get getPhone()
    {
        return this._phone
    }

    set setMessage(args)
    {
        this._message = args
    }

    get getMessage()
    {
        return this._message
    }
   set setPlataform(args)
    {
        this._plataform = args
    }

    get getPlataform()
    {
        return this._plataform
    }

    set setLink(args)
    {
        this._link = args
    }

    get getLink()
    {
        return this._link
    }

    get getTotalDigitsRequired()
    {
        return this._totalDigitsRequired
    }

    get getApiWhatsAppUrl()
    {
        return this._apiWhatsApp
    }

  get getWebWhatsAppUrl()
    {
        return this._webWhatsApp
    }
    validations()
    {
        if(!this.getPhone)
        {
            this.userMessage.error(
                {
                    text: 'Informe um número de celular',
                    tagClass: 'error'
                }
            )
            return false
        }
      
        if(!this.getPlataform)
        {
            this.userMessage.error(
                {
                    text: 'Informe uma plataforma',
                    tagClass: 'error'
                }
            )
            return false
        }

        if(this.getPhone.length < this.getTotalDigitsRequired)
        {
            let confirm = window.confirm(`Tem certeza que esse número ${this.getPhone} ta correto?`)

            if(confirm)
            {
                this.generateLink()
                return true
            }
            else
            {
                window.form.phone.focus()
                return false
            }
        }

        this.generateLink()
    }

    generateLink()
    {
      if(this.getPlataform == "desktop")
        {
          this.setLink = this.getWebWhatsAppUrl + this.getPhone
        }else{
          this.setLink = this.getApiWhatsAppUrl + this.getPhone
        }     
        if(this.getMessage)
        {
            this.setLink = this.getLink + `&text=${this.getMessage}`
        }

        this.userMessage.success(
            {
                text: 'Seu link está pronto! Compartilhe com usuários do Whatsapp!',
                tagClass: 'success'
            }
        )

        this.finish()
    }

    finish()
    {
        let initComponent = this.getElement('.initial')
        let finishComponent = this.getElement('.finished')

        if (!initComponent.classList.contains('d-none'))
        {
            initComponent.classList.add('d-none')
        }

        if (finishComponent.classList.contains('d-none'))
        {
            finishComponent.classList.remove('d-none')
        }

        window.form.link.value = this.getLink
    }

    restart()
    {
        let initComponent = this.getElement('.initial')
        let finishComponent = this.getElement('.finished')

        if (initComponent.classList.contains('d-none'))
        {
            initComponent.classList.remove('d-none')
        }

        if (!finishComponent.classList.contains('d-none'))
        {
            finishComponent.classList.add('d-none')
        }

        if (!this.getElement('.user-message').classList.contains('d-none'))
        {
            this.getElement('.user-message').classList.add('d-none')
        }

        window.form.phone.value = ''
        window.form.message.value = ''
        window.form.link.value = ''
        window.form.plataform.value = 'Desktop'
      
        this.submit.disable()
    }
}