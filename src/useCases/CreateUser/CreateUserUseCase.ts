import { IMailProvider } from './../../providers/IMailProvider';
import { User } from './../../entities/User';
import { ICreateUserRequestDTO } from './CreateUserDTO';
import { IUsersRepository } from './../../repositories/IUsersRepository';
// casos de uso , arquitetura limpa (clean architectura)

// Princípio de responsabilidade única (class em que único objetivo dessa classe e salvar o usuário)
// Única responsabilidade que essa classe tem salvar usuário e fazer a verificação se usuário existe
export class CreateUserUseCase {
    /* Princípio da inversão de dependência, dependendo de uma outra classe que faz a implementação de salvar
     * o usuário na data base
     */
    private usersRepository: IUsersRepository
    private mailProvider: IMailProvider
    constructor(
        usersRepository: IUsersRepository,
        mailProvider: IMailProvider,
    ) {
        this.usersRepository = usersRepository;
        this.mailProvider = mailProvider;
    }
    async execute(data: ICreateUserRequestDTO) {
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email);
        if (userAlreadyExists) {
            throw new Error("Usuário já existe.");
        }
        const user = new User(data);
        await this.usersRepository.save(user);
        // inversão de dependências
        await this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email,
            },
            from: {
                name: "Equipe do Meu App",
                email: "equipe@meuapp.com.br",
            },
            subject: "Seja bem-vindo á plataforma",
            body: "<p>Você já pode fazer login em nossa plataforma</p>"
        })
    }
}