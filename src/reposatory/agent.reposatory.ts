
import { Agent } from "src/entity/agent.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Agent)
export class AgentReposatory extends Repository<Agent>{
    
}