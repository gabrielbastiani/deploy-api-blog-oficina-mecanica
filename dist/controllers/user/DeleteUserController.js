"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserController = void 0;
const DeleteUserService_1 = require("../../services/user/DeleteUserService");
const RemovePhotoUserService_1 = require("../../services/user/RemovePhotoUserService");
const fs_1 = __importDefault(require("fs"));
class DeleteUserController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user_id = req.query.user_id;
            const removePhotoUser = new RemovePhotoUserService_1.RomovePhotoUserService();
            const deleteUserService = new DeleteUserService_1.DeleteUserService();
            const photoUser = yield removePhotoUser.execute({
                user_id,
            });
            fs_1.default.unlinkSync(__dirname + '/' + '..' + '/' + '..' + '/' + '..' + '/' + 'imgblog' + '/' + photoUser.photo);
            const userPhoto = yield deleteUserService.execute({
                user_id,
            });
            return res.json([userPhoto, photoUser]);
        });
    }
}
exports.DeleteUserController = DeleteUserController;
