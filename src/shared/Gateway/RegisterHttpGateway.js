class RegisterHttpGateway {
    dto = {name: "Visar Uruqi", email: "visar@hotelkeyapp.com"}

    async get() {
        return Promise.resolve({
            success: true,
            result: this.dto
        })
    }

    async post(dto) {
        if (dto.name.length >= 2 && dto.email.length >= 3) {
            this.dto = dto;
            return Promise.resolve({success: true, result: this.dto});
        } else {
            return Promise.resolve({success: false, result: this.dto});
        }
    }
}

export const gateway = new RegisterHttpGateway()

