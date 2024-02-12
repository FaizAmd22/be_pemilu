import { Repository } from "typeorm";
import { Vote } from "../entity/Vote";
import { AppDataSource } from "../data-source";

export default new (class VoteService {
  private readonly VoteRepository: Repository<Vote> =
    AppDataSource.getRepository(Vote);

  async create(data: any): Promise<object | string> {
    try {
      const checkVoter = await this.VoteRepository.countBy({
        user: { id: data.user },
      });
      if (checkVoter) return `Vote has already been done`;

      const response = await this.VoteRepository.save(data);

      return {
        message: "success voting",
        data: response,
      };
    } catch (error) {
      return "message: something error while creating a new Vote";
    }
  }
  async getAll(): Promise<object | string> {
    try {
      const vote = await this.VoteRepository.find({
        relations: ["user", "paslon"],
        select: {
          user: {
            name: true,
            address: true,
            gender: true,
          },
          paslon: {
            name: true,
          },
        },
      });
      const viewVote = vote.map((peserta) => {
        return {
          id: peserta.id,
          fullname: peserta.user.name,
          address: peserta.user.address,
          gender: peserta.user.gender,
          paslon: peserta.paslon.name,
        };
      });
      const countVoters = await this.VoteRepository.count();
      return {
        message: "success getting all Vote",
        jumlahVoters: countVoters,
        data: viewVote,
      };
    } catch (error) {
      return "message: something error while getting all Vote";
    }
  }
  async getOne(id: number): Promise<object | string> {
    try {
      const vote = await this.VoteRepository.findOne({
        where: { id },
        relations: ["user", "paslon"],
        select: {
          user: {
            name: true,
            address: true,
            gender: true,
          },
          paslon: {
            name: true,
          },
        },
      });

      const viewVote = {
        id: vote.id,
        fullname: vote.user.name,
        address: vote.user.address,
        gender: vote.user.gender,
        paslon: vote.paslon.name,
      };

      return {
        message: "success getting a Vote",
        data: viewVote,
      };
    } catch (error) {
      return "message: something error while getting a Vote";
    }
  }
})();
