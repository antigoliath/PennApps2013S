function update_codeview(_class, _interfaces, flag, lang)
{
	if(lang == "java")
	{
		var theskeleton = java_skeleton(_class, _interfaces, flag)
	}
	var bigstring = "<pre><code>" + 
		hljs.highlightAuto(theskeleton.code).value + 
		"</code></pre>"
	var warning_string = "Warnings: \n"
	var _allwarnings = []
	if(theskeleton.warnings[0])
	{
		for(var warn in theskeleton.warnings)
		{
			_allwarnings.push(theskeleton.warnings[warn])
		}
		warning_string = warning_string + _allwarnings.join("\n")
	}
	$('.the-code').html(bigstring)
	$('.warnings-panel').html(warning_string)
}