window.globalProvideData('slide', '{"title":"Select the correct order from the options in the drop-down boxes below.\\n\\nPut the PACT descriptions into the correct order.","trackViews":true,"showMenuResultIcon":false,"viewGroupId":"","historyGroupId":"","videoZoom":"","scrolling":false,"transition":"appear","transDuration":0,"transDir":1,"wipeTrans":false,"slideLock":false,"navIndex":-1,"globalAudioId":"","thumbnailid":"","presenterRef":{"id":"none"},"showAnimationId":"","lmsId":"Slide22","width":720,"height":540,"resume":true,"background":{"type":"fill","fill":{"type":"linear","rotation":90,"colors":[{"kind":"color","rgb":"0xFFFFFF","alpha":100,"stop":0}]}},"id":"6pKOxvMlVVM","actionGroups":{"ActGrpOnSubmitButtonClick":{"kind":"actiongroup","actions":[{"kind":"if_action","condition":{"statement":{"kind":"and","statements":[{"kind":"compare","operator":"noteq","valuea":"6PJVpc7QSrg.69sLOp0wqjS.$SelectedItemData","typea":"property","valueb":"","typeb":"string"},{"kind":"compare","operator":"noteq","valuea":"6PJVpc7QSrg.6VauVr21AgU.$SelectedItemData","typea":"property","valueb":"","typeb":"string"},{"kind":"compare","operator":"noteq","valuea":"6PJVpc7QSrg.6KufBOcIJqe.$SelectedItemData","typea":"property","valueb":"","typeb":"string"},{"kind":"compare","operator":"noteq","valuea":"6PJVpc7QSrg.699wzXkDWcj.$SelectedItemData","typea":"property","valueb":"","typeb":"string"}]}},"thenActions":[{"kind":"eval_interaction","id":"_this.5h2J7VgKQ6x"}],"elseActions":[{"kind":"gotoplay","window":"MessageWnd","wndtype":"normal","objRef":{"type":"string","value":"_player.MsgScene_5vDcgrJrCbd.InvalidPromptSlide"}}]}]},"ReviewInt_6PJVpc7QSrg":{"kind":"actiongroup","actions":[{"kind":"set_enabled","objRef":{"type":"string","value":"6PJVpc7QSrg.69sLOp0wqjS"},"enabled":{"type":"boolean","value":false}},{"kind":"set_enabled","objRef":{"type":"string","value":"6PJVpc7QSrg.6VauVr21AgU"},"enabled":{"type":"boolean","value":false}},{"kind":"set_enabled","objRef":{"type":"string","value":"6PJVpc7QSrg.6KufBOcIJqe"},"enabled":{"type":"boolean","value":false}},{"kind":"set_enabled","objRef":{"type":"string","value":"6PJVpc7QSrg.699wzXkDWcj"},"enabled":{"type":"boolean","value":false}},{"kind":"if_action","condition":{"statement":{"kind":"compare","operator":"eq","valuea":"5h2J7VgKQ6x.$Status","typea":"property","valueb":"correct","typeb":"string"}},"thenActions":[{"kind":"show","transition":"appear","objRef":{"type":"string","value":"6PJVpc7QSrg_CorrectReview"}}],"elseActions":[{"kind":"show","transition":"appear","objRef":{"type":"string","value":"6PJVpc7QSrg_IncorrectReview"}}]},{"kind":"if_action","condition":{"statement":{"kind":"compare","operator":"eq","valuea":"_player.#CurrentQuiz_6PJVpc7QSrg","typea":"var","valueb":"6CtfevYZAjV","typeb":"string"}},"thenActions":[{"kind":"exe_actiongroup","id":"SetLayout_pxabnsnfns00000000101"}]}]},"ReviewIntCorrectIncorrect_6PJVpc7QSrg":{"kind":"actiongroup","actions":[{"kind":"set_review","objRef":{"type":"string","value":"6PJVpc7QSrg.69sLOp0wqjS"},"enabled":{"type":"boolean","value":true}},{"kind":"set_review","objRef":{"type":"string","value":"6PJVpc7QSrg.6VauVr21AgU"},"enabled":{"type":"boolean","value":true}},{"kind":"set_review","objRef":{"type":"string","value":"6PJVpc7QSrg.6KufBOcIJqe"},"enabled":{"type":"boolean","value":true}},{"kind":"set_review","objRef":{"type":"string","value":"6PJVpc7QSrg.699wzXkDWcj"},"enabled":{"type":"boolean","value":true}},{"kind":"show","transition":"appear","objRef":{"type":"string","value":"6PJVpc7QSrg.69sLOp0wqjS_ReviewShape"}},{"kind":"show","transition":"appear","objRef":{"type":"string","value":"6PJVpc7QSrg.6VauVr21AgU_ReviewShape"}},{"kind":"show","transition":"appear","objRef":{"type":"string","value":"6PJVpc7QSrg.6KufBOcIJqe_ReviewShape"}},{"kind":"show","transition":"appear","objRef":{"type":"string","value":"6PJVpc7QSrg.699wzXkDWcj_ReviewShape"}}]},"AnsweredInt_6PJVpc7QSrg":{"kind":"actiongroup","actions":[{"kind":"exe_actiongroup","id":"DisableChoices_6PJVpc7QSrg"},{"kind":"if_action","condition":{"statement":{"kind":"compare","operator":"eq","valuea":"$WindowId","typea":"property","valueb":"_frame","typeb":"string"}},"thenActions":[{"kind":"set_frame_layout","name":"pxabnsnfns00000000101"}],"elseActions":[{"kind":"set_window_control_layout","name":"pxabnsnfns00000000101"}]}]},"DisableChoices_6PJVpc7QSrg":{"kind":"actiongroup","actions":[{"kind":"set_enabled","objRef":{"type":"string","value":"6PJVpc7QSrg.69sLOp0wqjS"},"enabled":{"type":"boolean","value":false}},{"kind":"set_enabled","objRef":{"type":"string","value":"6PJVpc7QSrg.6VauVr21AgU"},"enabled":{"type":"boolean","value":false}},{"kind":"set_enabled","objRef":{"type":"string","value":"6PJVpc7QSrg.6KufBOcIJqe"},"enabled":{"type":"boolean","value":false}},{"kind":"set_enabled","objRef":{"type":"string","value":"6PJVpc7QSrg.699wzXkDWcj"},"enabled":{"type":"boolean","value":false}}]},"6PJVpc7QSrg_CheckAnswered":{"kind":"actiongroup","actions":[{"kind":"if_action","condition":{"statement":{"kind":"or","statements":[{"kind":"compare","operator":"eq","valuea":"5h2J7VgKQ6x.$Status","typea":"property","valueb":"correct","typeb":"string"},{"kind":"compare","operator":"eq","valuea":"_player.6CtfevYZAjV.$QuizComplete","typea":"property","valueb":true,"typeb":"boolean"}]}},"thenActions":[{"kind":"exe_actiongroup","id":"AnsweredInt_6PJVpc7QSrg"}],"elseActions":[{"kind":"if_action","condition":{"statement":{"kind":"compare","operator":"eq","valuea":"5h2J7VgKQ6x.$Status","typea":"property","valueb":"incorrect","typeb":"string"}},"thenActions":[{"kind":"if_action","condition":{"statement":{"kind":"compare","operator":"gte","valuea":"5h2J7VgKQ6x.$AttemptCount","typea":"property","valueb":1,"typeb":"number"}},"thenActions":[{"kind":"exe_actiongroup","id":"AnsweredInt_6PJVpc7QSrg"}]}]}]}]},"SetLayout_pxabnsnfns00000000101":{"kind":"actiongroup","actions":[{"kind":"if_action","condition":{"statement":{"kind":"compare","operator":"eq","valuea":"$WindowId","typea":"property","valueb":"_frame","typeb":"string"}},"thenActions":[{"kind":"set_frame_layout","name":"pxabnsnfns00000000101"}],"elseActions":[{"kind":"set_window_control_layout","name":"pxabnsnfns00000000101"}]}]},"NavigationRestrictionNextSlide_6pKOxvMlVVM":{"kind":"actiongroup","actions":[{"kind":"gotoplay","window":"_current","wndtype":"normal","objRef":{"type":"string","value":"_parent.5keWz4iJZ4t"}}]},"NavigationRestrictionPreviousSlide_6pKOxvMlVVM":{"kind":"actiongroup","actions":[{"kind":"history_prev"}]}},"events":[{"kind":"onbeforeslidein","actions":[{"kind":"if_action","condition":{"statement":{"kind":"compare","operator":"eq","valuea":"$WindowId","typea":"property","valueb":"_frame","typeb":"string"}},"thenActions":[{"kind":"set_frame_layout","name":"npnxnanbsnfns00000000101"}],"elseActions":[{"kind":"set_window_control_layout","name":"npnxnanbsnfns00000000101"}]}]},{"kind":"onsubmitslide","actions":[{"kind":"exe_actiongroup","id":"ActGrpOnSubmitButtonClick"}]},{"kind":"ontransitionin","actions":[{"kind":"adjustvar","variable":"_player.LastSlideViewed_5vDcgrJrCbd","operator":"set","value":{"type":"string","value":"_player."}},{"kind":"adjustvar","variable":"_player.LastSlideViewed_5vDcgrJrCbd","operator":"add","value":{"type":"property","value":"$AbsoluteId"}},{"kind":"if_action","condition":{"statement":{"kind":"compare","operator":"eq","valuea":"_player.#ReviewMode_6PJVpc7QSrg","typea":"var","valueb":true,"typeb":"boolean"}},"thenActions":[{"kind":"exe_actiongroup","id":"ReviewInt_6PJVpc7QSrg"}],"elseActions":[{"kind":"exe_actiongroup","id":"6PJVpc7QSrg_CheckAnswered"}]}]},{"kind":"onnextslide","actions":[{"kind":"if_action","condition":{"statement":{"kind":"compare","operator":"eq","valuea":"_player.#ReviewMode_6PJVpc7QSrg","typea":"var","valueb":true,"typeb":"boolean"}},"thenActions":[{"kind":"if_action","condition":{"statement":{"kind":"compare","operator":"eq","valuea":"_player.#CurrentQuiz_6PJVpc7QSrg","typea":"var","valueb":"6CtfevYZAjV","typeb":"string"}},"thenActions":[{"kind":"nextviewedslide","quizRef":{"type":"string","value":"_player.6CtfevYZAjV"},"completed_slide_ref":{"type":"string","value":"_player.5qqaRyYjXon.6p84BRS8HSN"}}],"elseActions":[]}],"elseActions":[{"kind":"exe_actiongroup","id":"NavigationRestrictionNextSlide_6pKOxvMlVVM"}]}]},{"kind":"onprevslide","actions":[{"kind":"exe_actiongroup","id":"NavigationRestrictionPreviousSlide_6pKOxvMlVVM"}]}],"slideLayers":[{"enableSeek":true,"enableReplay":true,"timeline":{"duration":5000,"events":[{"kind":"ontimelinetick","time":0,"actions":[{"kind":"show","transition":"appear","objRef":{"type":"string","value":"6PJVpc7QSrg"}},{"kind":"show","transition":"appear","objRef":{"type":"string","value":"6PJVpc7QSrg.699wzXkDWcj"}},{"kind":"show","transition":"appear","objRef":{"type":"string","value":"6PJVpc7QSrg.6KufBOcIJqe"}},{"kind":"show","transition":"appear","objRef":{"type":"string","value":"6PJVpc7QSrg.6VauVr21AgU"}},{"kind":"show","transition":"appear","objRef":{"type":"string","value":"6PJVpc7QSrg.69sLOp0wqjS"}},{"kind":"show","transition":"appear","objRef":{"type":"string","value":"6EhQ5KXExC1"}}]}]},"objects":[{"kind":"scrollarea","contentwidth":551,"contentheight":194,"objects":[{"kind":"shufflegroup","objects":[{"kind":"droplist","shuffle":true,"reviewwidth":275,"reviewindex":3,"shapemaskId":"","xPos":0,"yPos":151,"tabIndex":5,"tabEnabled":true,"xOffset":0,"yOffset":0,"rotateXPos":275.5,"rotateYPos":13.5,"scaleX":100,"scaleY":100,"alpha":100,"rotation":0,"depth":1,"scrolling":true,"shuffleLock":false,"data":{"hotlinkId":"","accState":0,"textdata":{"uniqueId":"txt2_699wzXkDWcj","type":"vectortext","altText":"--Select--","xPos":0,"yPos":0,"width":0,"height":0,"shadowIndex":-1,"vectortext":{"left":0,"top":0,"right":69,"bottom":25,"pngfb":false,"pr":{"l":"Lib","i":200}}},"itemlist":[{"kind":"item","itemdata":"choices.choice_69sLOp0wqjS","hotlinkId":"","accState":0,"textdata":{"uniqueId":"txt_69sLOp0wqjS_-664275270","type":"vectortext","altText":"Summarise the areas that your products, and your company can help alleviate","xPos":0,"yPos":0,"width":0,"height":0,"shadowIndex":-1,"vectortext":{"left":0,"top":0,"right":475,"bottom":24,"pngfb":false,"pr":{"l":"Lib","i":201}}}},{"kind":"item","itemdata":"choices.choice_6VauVr21AgU","hotlinkId":"","accState":0,"textdata":{"uniqueId":"txt_6VauVr21AgU_-1009958035","type":"vectortext","altText":"Summarise the key benefits, linking these to the customer’s needs and values","xPos":0,"yPos":0,"width":0,"height":0,"shadowIndex":-1,"vectortext":{"left":0,"top":0,"right":470,"bottom":24,"pngfb":false,"pr":{"l":"Lib","i":202}}}},{"kind":"item","itemdata":"choices.choice_6KufBOcIJqe","hotlinkId":"","accState":0,"textdata":{"uniqueId":"txt_6KufBOcIJqe_2118556743","type":"vectortext","altText":"Reintroduce the company’s name, on the back of the relationship you’ve developed with the customer","xPos":0,"yPos":0,"width":0,"height":0,"shadowIndex":-1,"vectortext":{"left":0,"top":0,"right":500,"bottom":21,"pngfb":false,"pr":{"l":"Lib","i":203}}}},{"kind":"item","itemdata":"choices.choice_699wzXkDWcj","hotlinkId":"","accState":0,"textdata":{"uniqueId":"txt_699wzXkDWcj_1847485872","type":"vectortext","altText":"Apply your closing technique in a positive manner","xPos":0,"yPos":0,"width":0,"height":0,"shadowIndex":-1,"vectortext":{"left":0,"top":0,"right":386,"bottom":26,"pngfb":false,"pr":{"l":"Lib","i":204}}}}]},"width":551,"height":27,"resume":true,"useHandCursor":true,"id":"699wzXkDWcj"},{"kind":"droplist","shuffle":true,"reviewwidth":275,"reviewindex":2,"shapemaskId":"","xPos":0,"yPos":104,"tabIndex":4,"tabEnabled":true,"xOffset":0,"yOffset":0,"rotateXPos":275.5,"rotateYPos":13.5,"scaleX":100,"scaleY":100,"alpha":100,"rotation":0,"depth":2,"scrolling":true,"shuffleLock":false,"data":{"hotlinkId":"","accState":0,"textdata":{"uniqueId":"txt2_699wzXkDWcj","type":"vectortext","altText":"--Select--","xPos":0,"yPos":0,"width":0,"height":0,"shadowIndex":-1,"vectortext":{"left":0,"top":0,"right":69,"bottom":25,"pngfb":false,"pr":{"l":"Lib","i":200}}},"itemlist":[{"kind":"item","itemdata":"choices.choice_69sLOp0wqjS","hotlinkId":"","accState":0,"textdata":{"uniqueId":"txt_69sLOp0wqjS_-664275270","type":"vectortext","altText":"Summarise the areas that your products, and your company can help alleviate","xPos":0,"yPos":0,"width":0,"height":0,"shadowIndex":-1,"vectortext":{"left":0,"top":0,"right":475,"bottom":24,"pngfb":false,"pr":{"l":"Lib","i":201}}}},{"kind":"item","itemdata":"choices.choice_6VauVr21AgU","hotlinkId":"","accState":0,"textdata":{"uniqueId":"txt_6VauVr21AgU_-1009958035","type":"vectortext","altText":"Summarise the key benefits, linking these to the customer’s needs and values","xPos":0,"yPos":0,"width":0,"height":0,"shadowIndex":-1,"vectortext":{"left":0,"top":0,"right":470,"bottom":24,"pngfb":false,"pr":{"l":"Lib","i":202}}}},{"kind":"item","itemdata":"choices.choice_6KufBOcIJqe","hotlinkId":"","accState":0,"textdata":{"uniqueId":"txt_6KufBOcIJqe_2118556743","type":"vectortext","altText":"Reintroduce the company’s name, on the back of the relationship you’ve developed with the customer","xPos":0,"yPos":0,"width":0,"height":0,"shadowIndex":-1,"vectortext":{"left":0,"top":0,"right":500,"bottom":21,"pngfb":false,"pr":{"l":"Lib","i":203}}}},{"kind":"item","itemdata":"choices.choice_699wzXkDWcj","hotlinkId":"","accState":0,"textdata":{"uniqueId":"txt_699wzXkDWcj_1847485872","type":"vectortext","altText":"Apply your closing technique in a positive manner","xPos":0,"yPos":0,"width":0,"height":0,"shadowIndex":-1,"vectortext":{"left":0,"top":0,"right":386,"bottom":26,"pngfb":false,"pr":{"l":"Lib","i":204}}}}]},"width":551,"height":27,"resume":true,"useHandCursor":true,"id":"6KufBOcIJqe"},{"kind":"droplist","shuffle":true,"reviewwidth":275,"reviewindex":1,"shapemaskId":"","xPos":0,"yPos":57,"tabIndex":3,"tabEnabled":true,"xOffset":0,"yOffset":0,"rotateXPos":275.5,"rotateYPos":13.5,"scaleX":100,"scaleY":100,"alpha":100,"rotation":0,"depth":3,"scrolling":true,"shuffleLock":false,"data":{"hotlinkId":"","accState":0,"textdata":{"uniqueId":"txt2_699wzXkDWcj","type":"vectortext","altText":"--Select--","xPos":0,"yPos":0,"width":0,"height":0,"shadowIndex":-1,"vectortext":{"left":0,"top":0,"right":69,"bottom":25,"pngfb":false,"pr":{"l":"Lib","i":200}}},"itemlist":[{"kind":"item","itemdata":"choices.choice_69sLOp0wqjS","hotlinkId":"","accState":0,"textdata":{"uniqueId":"txt_69sLOp0wqjS_-664275270","type":"vectortext","altText":"Summarise the areas that your products, and your company can help alleviate","xPos":0,"yPos":0,"width":0,"height":0,"shadowIndex":-1,"vectortext":{"left":0,"top":0,"right":475,"bottom":24,"pngfb":false,"pr":{"l":"Lib","i":201}}}},{"kind":"item","itemdata":"choices.choice_6VauVr21AgU","hotlinkId":"","accState":0,"textdata":{"uniqueId":"txt_6VauVr21AgU_-1009958035","type":"vectortext","altText":"Summarise the key benefits, linking these to the customer’s needs and values","xPos":0,"yPos":0,"width":0,"height":0,"shadowIndex":-1,"vectortext":{"left":0,"top":0,"right":470,"bottom":24,"pngfb":false,"pr":{"l":"Lib","i":202}}}},{"kind":"item","itemdata":"choices.choice_6KufBOcIJqe","hotlinkId":"","accState":0,"textdata":{"uniqueId":"txt_6KufBOcIJqe_2118556743","type":"vectortext","altText":"Reintroduce the company’s name, on the back of the relationship you’ve developed with the customer","xPos":0,"yPos":0,"width":0,"height":0,"shadowIndex":-1,"vectortext":{"left":0,"top":0,"right":500,"bottom":21,"pngfb":false,"pr":{"l":"Lib","i":203}}}},{"kind":"item","itemdata":"choices.choice_699wzXkDWcj","hotlinkId":"","accState":0,"textdata":{"uniqueId":"txt_699wzXkDWcj_1847485872","type":"vectortext","altText":"Apply your closing technique in a positive manner","xPos":0,"yPos":0,"width":0,"height":0,"shadowIndex":-1,"vectortext":{"left":0,"top":0,"right":386,"bottom":26,"pngfb":false,"pr":{"l":"Lib","i":204}}}}]},"width":551,"height":27,"resume":true,"useHandCursor":true,"id":"6VauVr21AgU"},{"kind":"droplist","shuffle":true,"reviewwidth":275,"reviewindex":0,"shapemaskId":"","xPos":0,"yPos":10,"tabIndex":2,"tabEnabled":true,"xOffset":0,"yOffset":0,"rotateXPos":275.5,"rotateYPos":13.5,"scaleX":100,"scaleY":100,"alpha":100,"rotation":0,"depth":4,"scrolling":true,"shuffleLock":false,"data":{"hotlinkId":"","accState":0,"textdata":{"uniqueId":"txt2_699wzXkDWcj","type":"vectortext","altText":"--Select--","xPos":0,"yPos":0,"width":0,"height":0,"shadowIndex":-1,"vectortext":{"left":0,"top":0,"right":69,"bottom":25,"pngfb":false,"pr":{"l":"Lib","i":200}}},"itemlist":[{"kind":"item","itemdata":"choices.choice_69sLOp0wqjS","hotlinkId":"","accState":0,"textdata":{"uniqueId":"txt_69sLOp0wqjS_-664275270","type":"vectortext","altText":"Summarise the areas that your products, and your company can help alleviate","xPos":0,"yPos":0,"width":0,"height":0,"shadowIndex":-1,"vectortext":{"left":0,"top":0,"right":475,"bottom":24,"pngfb":false,"pr":{"l":"Lib","i":201}}}},{"kind":"item","itemdata":"choices.choice_6VauVr21AgU","hotlinkId":"","accState":0,"textdata":{"uniqueId":"txt_6VauVr21AgU_-1009958035","type":"vectortext","altText":"Summarise the key benefits, linking these to the customer’s needs and values","xPos":0,"yPos":0,"width":0,"height":0,"shadowIndex":-1,"vectortext":{"left":0,"top":0,"right":470,"bottom":24,"pngfb":false,"pr":{"l":"Lib","i":202}}}},{"kind":"item","itemdata":"choices.choice_6KufBOcIJqe","hotlinkId":"","accState":0,"textdata":{"uniqueId":"txt_6KufBOcIJqe_2118556743","type":"vectortext","altText":"Reintroduce the company’s name, on the back of the relationship you’ve developed with the customer","xPos":0,"yPos":0,"width":0,"height":0,"shadowIndex":-1,"vectortext":{"left":0,"top":0,"right":500,"bottom":21,"pngfb":false,"pr":{"l":"Lib","i":203}}}},{"kind":"item","itemdata":"choices.choice_699wzXkDWcj","hotlinkId":"","accState":0,"textdata":{"uniqueId":"txt_699wzXkDWcj_1847485872","type":"vectortext","altText":"Apply your closing technique in a positive manner","xPos":0,"yPos":0,"width":0,"height":0,"shadowIndex":-1,"vectortext":{"left":0,"top":0,"right":386,"bottom":26,"pngfb":false,"pr":{"l":"Lib","i":204}}}}]},"width":551,"height":27,"resume":true,"useHandCursor":true,"id":"69sLOp0wqjS"}],"shuffle":false,"shapemaskId":"","xPos":0,"yPos":0,"tabIndex":-1,"tabEnabled":true,"xOffset":0,"yOffset":0,"rotateXPos":0,"rotateYPos":0,"scaleX":100,"scaleY":100,"alpha":100,"rotation":0,"depth":1,"scrolling":true,"shuffleLock":false,"width":0,"height":0,"resume":false,"useHandCursor":true,"id":""},{"kind":"vectorshape","rotation":0,"accType":"text","cliptobounds":false,"defaultAction":"","textLib":[{"kind":"textdata","uniqueId":"69sLOp0wqjS_ReviewShape","id":"01","linkId":"69sLOp0wqjS_ReviewShape","type":"vectortext","xPos":0,"yPos":0,"width":0,"height":0,"shadowIndex":-1,"vectortext":{"left":0,"top":0,"right":255,"bottom":26,"pngfb":false,"pr":{"l":"Lib","i":206}}}],"shapemaskId":"","xPos":285,"yPos":10,"tabIndex":-1,"tabEnabled":true,"xOffset":0,"yOffset":0,"rotateXPos":137.5,"rotateYPos":13.5,"scaleX":100,"scaleY":100,"alpha":100,"depth":2,"scrolling":true,"shuffleLock":false,"data":{"hotlinkId":"","accState":0,"vectorData":{"left":0,"top":0,"right":255,"bottom":26,"altText":"Summarise the areas that your products, and your company can help alleviate","pngfb":false,"pr":{"l":"Lib","i":205}},"html5data":{"xPos":0,"yPos":0,"width":255,"height":26,"strokewidth":0}},"width":275,"height":27,"resume":false,"useHandCursor":true,"id":"69sLOp0wqjS_ReviewShape"},{"kind":"vectorshape","rotation":0,"accType":"text","cliptobounds":false,"defaultAction":"","textLib":[{"kind":"textdata","uniqueId":"6VauVr21AgU_ReviewShape","id":"01","linkId":"6VauVr21AgU_ReviewShape","type":"vectortext","xPos":0,"yPos":0,"width":0,"height":0,"shadowIndex":-1,"vectortext":{"left":0,"top":0,"right":258,"bottom":26,"pngfb":false,"pr":{"l":"Lib","i":207}}}],"shapemaskId":"","xPos":285,"yPos":57,"tabIndex":-1,"tabEnabled":true,"xOffset":0,"yOffset":0,"rotateXPos":137.5,"rotateYPos":13.5,"scaleX":100,"scaleY":100,"alpha":100,"depth":3,"scrolling":true,"shuffleLock":false,"data":{"hotlinkId":"","accState":0,"vectorData":{"left":0,"top":0,"right":258,"bottom":26,"altText":"Summarise the key benefits, linking these to the customer’s needs and values","pngfb":false,"pr":{"l":"Lib","i":205}},"html5data":{"xPos":0,"yPos":0,"width":258,"height":26,"strokewidth":0}},"width":275,"height":27,"resume":false,"useHandCursor":true,"id":"6VauVr21AgU_ReviewShape"},{"kind":"vectorshape","rotation":0,"accType":"text","cliptobounds":false,"defaultAction":"","textLib":[{"kind":"textdata","uniqueId":"6KufBOcIJqe_ReviewShape","id":"01","linkId":"6KufBOcIJqe_ReviewShape","type":"vectortext","xPos":0,"yPos":0,"width":0,"height":0,"shadowIndex":-1,"vectortext":{"left":0,"top":0,"right":266,"bottom":26,"pngfb":false,"pr":{"l":"Lib","i":208}}}],"shapemaskId":"","xPos":285,"yPos":104,"tabIndex":-1,"tabEnabled":true,"xOffset":0,"yOffset":0,"rotateXPos":137.5,"rotateYPos":13.5,"scaleX":100,"scaleY":100,"alpha":100,"depth":4,"scrolling":true,"shuffleLock":false,"data":{"hotlinkId":"","accState":0,"vectorData":{"left":0,"top":0,"right":266,"bottom":26,"altText":"Reintroduce the company’s name, on the back of the relationship you’ve developed with the customer","pngfb":false,"pr":{"l":"Lib","i":205}},"html5data":{"xPos":0,"yPos":0,"width":266,"height":26,"strokewidth":0}},"width":275,"height":27,"resume":false,"useHandCursor":true,"id":"6KufBOcIJqe_ReviewShape"},{"kind":"vectorshape","rotation":0,"accType":"text","cliptobounds":false,"defaultAction":"","textLib":[{"kind":"textdata","uniqueId":"699wzXkDWcj_ReviewShape","id":"01","linkId":"699wzXkDWcj_ReviewShape","type":"vectortext","xPos":0,"yPos":0,"width":0,"height":0,"shadowIndex":-1,"vectortext":{"left":0,"top":0,"right":275,"bottom":23,"pngfb":false,"pr":{"l":"Lib","i":209}}}],"shapemaskId":"","xPos":285,"yPos":151,"tabIndex":-1,"tabEnabled":true,"xOffset":0,"yOffset":0,"rotateXPos":137.5,"rotateYPos":13.5,"scaleX":100,"scaleY":100,"alpha":100,"depth":5,"scrolling":true,"shuffleLock":false,"data":{"hotlinkId":"","accState":0,"vectorData":{"left":0,"top":0,"right":275,"bottom":23,"altText":"Apply your closing technique in a positive manner","pngfb":false,"pr":{"l":"Lib","i":205}},"html5data":{"xPos":0,"yPos":0,"width":275,"height":23,"strokewidth":0}},"width":275,"height":27,"resume":false,"useHandCursor":true,"id":"699wzXkDWcj_ReviewShape"}],"shapemaskId":"","xPos":36,"yPos":178,"tabIndex":1,"tabEnabled":false,"xOffset":0,"yOffset":0,"rotateXPos":324,"rotateYPos":162,"scaleX":100,"scaleY":100,"alpha":100,"rotation":0,"depth":1,"scrolling":true,"shuffleLock":false,"data":{"hotlinkId":"","accState":0,"html5data":{"url":"","xPos":36,"yPos":178,"width":648,"height":324,"strokewidth":0}},"width":648,"height":324,"resume":true,"useHandCursor":true,"background":{"type":"vector","vectorData":{"left":0,"top":0,"right":648,"bottom":324,"altText":"Sequence Drop-down","pngfb":false,"pr":{"l":"Lib","i":199}}},"id":"6PJVpc7QSrg"},{"kind":"vectorshape","rotation":0,"accType":"text","cliptobounds":false,"defaultAction":"","textLib":[{"kind":"textdata","uniqueId":"6EhQ5KXExC1_-1573593004","id":"01","linkId":"txt__default_6EhQ5KXExC1","type":"vectortext","xPos":0,"yPos":0,"width":0,"height":0,"shadowIndex":-1,"vectortext":{"left":0,"top":0,"right":620,"bottom":141,"pngfb":false,"pr":{"l":"Lib","i":210}}}],"shapemaskId":"","xPos":36,"yPos":22,"tabIndex":0,"tabEnabled":true,"xOffset":0,"yOffset":0,"rotateXPos":324,"rotateYPos":73,"scaleX":100,"scaleY":100,"alpha":100,"depth":2,"scrolling":true,"shuffleLock":false,"data":{"hotlinkId":"","accState":0,"vectorData":{"left":0,"top":0,"right":648,"bottom":146,"altText":"Select the correct order from the options in the drop-down boxes below.\\n\\nPut the PACT descriptions into the correct order.","pngfb":false,"pr":{"l":"Lib","i":30}},"html5data":{"xPos":-1,"yPos":-1,"width":649,"height":147,"strokewidth":0}},"width":648,"height":146,"resume":true,"useHandCursor":true,"id":"6EhQ5KXExC1"},{"kind":"vectorshape","rotation":0,"accType":"text","cliptobounds":false,"defaultAction":"","textLib":[{"kind":"textdata","uniqueId":"6PJVpc7QSrg_CorrectReview","id":"01","linkId":"6PJVpc7QSrg_CorrectReview","type":"vectortext","xPos":0,"yPos":0,"width":0,"height":0,"shadowIndex":-1,"vectortext":{"left":0,"top":0,"right":400,"bottom":37,"pngfb":false,"pr":{"l":"Lib","i":33}}}],"shapemaskId":"","xPos":0,"yPos":500,"tabIndex":6,"tabEnabled":true,"xOffset":0,"yOffset":0,"rotateXPos":360,"rotateYPos":20,"scaleX":100,"scaleY":100,"alpha":100,"depth":3,"scrolling":true,"shuffleLock":false,"data":{"hotlinkId":"","accState":0,"vectorData":{"left":-1,"top":-1,"right":720,"bottom":40,"altText":"Correct","pngfb":false,"pr":{"l":"Lib","i":32}},"html5data":{"xPos":1,"yPos":1,"width":717,"height":37,"strokewidth":2}},"width":720,"height":40,"resume":false,"useHandCursor":true,"id":"6PJVpc7QSrg_CorrectReview","events":[{"kind":"onrelease","actions":[{"kind":"hide","transition":"appear","objRef":{"type":"string","value":"_this"}}]}]},{"kind":"vectorshape","rotation":0,"accType":"text","cliptobounds":false,"defaultAction":"","textLib":[{"kind":"textdata","uniqueId":"6PJVpc7QSrg_IncorrectReview","id":"01","linkId":"6PJVpc7QSrg_IncorrectReview","type":"vectortext","xPos":0,"yPos":0,"width":0,"height":0,"shadowIndex":-1,"vectortext":{"left":0,"top":0,"right":409,"bottom":37,"pngfb":false,"pr":{"l":"Lib","i":35}}}],"shapemaskId":"","xPos":0,"yPos":500,"tabIndex":7,"tabEnabled":true,"xOffset":0,"yOffset":0,"rotateXPos":360,"rotateYPos":20,"scaleX":100,"scaleY":100,"alpha":100,"depth":4,"scrolling":true,"shuffleLock":false,"data":{"hotlinkId":"","accState":0,"vectorData":{"left":-1,"top":-1,"right":720,"bottom":40,"altText":"Incorrect","pngfb":false,"pr":{"l":"Lib","i":34}},"html5data":{"xPos":1,"yPos":1,"width":717,"height":37,"strokewidth":2}},"width":720,"height":40,"resume":false,"useHandCursor":true,"id":"6PJVpc7QSrg_IncorrectReview","events":[{"kind":"onrelease","actions":[{"kind":"hide","transition":"appear","objRef":{"type":"string","value":"_this"}}]}]}],"startTime":-1,"elapsedTimeMode":"normal","useHandCursor":false,"resume":true,"kind":"slidelayer","isBaseLayer":true}]}');