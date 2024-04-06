import { PartialType } from "@nestjs/swagger";
import { CreateUsuarioPersonal } from "./create-usuario-personal.dto";

export class UpdateUsuarioPersonalDto extends PartialType(CreateUsuarioPersonal) {}